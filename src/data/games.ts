import { useCallback } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import {
  atom,
  derive,
  localStorage,
  useDeriveValue,
  useSetAtom,
} from "@yaasl/react"

import { createId } from "~/utils/createId"

import { Player, playersAtom } from "./players"

export interface RawGame {
  id: string
  name: string
  playerId: string
  date: string
}

export interface Game extends Omit<RawGame, "playerId"> {
  player?: Player
}

export const gamesAtom = atom<RawGame[]>({
  defaultValue: [],
  name: "games",
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

const extendedGames = derive<Game[]>(({ get }) => {
  const games = get(gamesAtom)
  const players = get(playersAtom)

  return games.map(({ playerId, ...game }) => {
    const player = players.find(player => player.id === playerId)
    return { ...game, player }
  })
})

export const useGames = () => {
  const games = useDeriveValue(extendedGames)
  const setGames = useSetAtom(gamesAtom)

  const addGame = useCallback(
    (data: Omit<RawGame, "id">) => {
      const game = { id: createId(), ...data }
      setGames(prev => [...prev, game])
    },
    [setGames]
  )

  const editGame = useCallback(
    (id: string, data: Partial<RawGame>) => {
      setGames(prev =>
        prev.map(game => (game.id === id ? { ...game, ...data } : game))
      )
    },
    [setGames]
  )

  const removeGame = useCallback(
    (id: string) => {
      setGames(prev => prev.filter(game => game.id !== id))
    },
    [setGames]
  )

  return { games, addGame, editGame, removeGame }
}

import { useCallback } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import {
  atom,
  derive,
  localStorage,
  useDeriveValue,
  useSetDerive,
} from "@yaasl/react"

import { createId } from "~/utils/createId"
import { timeBetween, timeSince, today } from "~/utils/date"

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

const gamesAtom = atom<RawGame[]>({
  defaultValue: [],
  name: "games",
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

const sortedGames = derive<RawGame[]>(
  ({ get }) => get(gamesAtom).sort((a, b) => a.date.localeCompare(b.date)),
  ({ set, value }) =>
    set(
      gamesAtom,
      value.sort((a, b) => a.date.localeCompare(b.date))
    )
)

const extendedGames = derive<Game[]>(({ get }) => {
  const games = get(sortedGames)
  const players = get(playersAtom)

  return games.map(({ playerId, ...game }) => {
    const player = players.find(player => player.id === playerId)
    return { ...game, player }
  })
})

export const useGames = () => {
  const games = useDeriveValue(extendedGames)
  const setGames = useSetDerive(sortedGames)

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

const gameStatsAtom = derive(({ get }) => {
  const games = get(sortedGames)
  const averageTime =
    games.length < 2
      ? 0
      : timeBetween(games[0]?.date, games.at(-1)?.date) / games.length - 1

  return {
    averageTime: averageTime,
    totalGames: games.length,
    playingSince: timeSince(games[0]?.date ?? today()),
  }
})

export const useGameStats = () => useDeriveValue(gameStatsAtom)

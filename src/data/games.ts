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

export interface PlayerStats {
  rating?: number
  playtime?: number
}

export interface RawGame {
  id: string
  name: string
  playerId: string
  date: string
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  stats?: {
    [playerId: string]: PlayerStats
  }
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
      return game.id
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

const gamePlayerStatsAtom = derive(({ get }) => {
  const games = get(extendedGames)
  const players = get(playersAtom)

  return players.map(({ id }) => {
    const timedGames = games
      .map(({ stats }) => stats?.[id]?.playtime)
      .filter(Boolean) as number[]
    const ratedGames = games
      .map(({ stats }) => stats?.[id]?.rating)
      .filter(Boolean) as number[]

    return {
      id,
      averageTime:
        timedGames.reduce((total, playtime) => total + playtime, 0) /
        Math.max(timedGames.length, 1),
      averageRating:
        ratedGames.reduce((total, rating) => total + rating, 0) /
        Math.max(ratedGames.length, 1),
    }
  })
})

export const useGamePlayerStats = () => useDeriveValue(gamePlayerStatsAtom)

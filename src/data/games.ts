import { useCallback } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import {
  createAtom,
  createDerived,
  localStorage,
  useAtomValue,
  useSetAtom,
} from "@yaasl/react"

import { createId } from "~/utils/createId"
import { timeBetween, timeSince, today } from "~/utils/date"

import { Player, playersAtom } from "./players"
import { rulesetAtom } from "./ruleset"

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

export const gamesAtom = createAtom<RawGame[]>({
  defaultValue: [],
  name: "games",
  effects: [localStorage(), reduxDevtools({ disable: import.meta.env.PROD })],
})

const sortedGames = createDerived<RawGame[]>(
  ({ get }) => get(gamesAtom).sort((a, b) => a.date.localeCompare(b.date)),
  ({ set, value }) =>
    set(
      gamesAtom,
      value.sort((a, b) => a.date.localeCompare(b.date))
    )
)

const extendedGames = createDerived<Game[]>(({ get }) => {
  const games = get(sortedGames)
  const players = get(playersAtom)

  return games.map(({ playerId, ...game }) => {
    const player = players.find(player => player.id === playerId)
    return { ...game, player }
  })
})

export const useGames = () => {
  const games = useAtomValue(extendedGames)
  const setGames = useSetAtom(sortedGames)

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

const gameStatsAtom = createDerived(({ get }) => {
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

export const useGameStats = () => useAtomValue(gameStatsAtom)

const gamePlayerStatsAtom = createDerived(({ get }) => {
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

export const useGamePlayerStats = () => useAtomValue(gamePlayerStatsAtom)

export const calcHandicap = (wins: number, max: number, severity = 0.75) => {
  if (severity <= 0) return 0
  const result = Math.pow((1 / max) * wins, 1 / severity)
  return Math.round(result * 100) / 100
}

const spinnerHandicapAtom = createDerived(({ get }) => {
  const games = get(sortedGames).reverse()
  const ruleset = get(rulesetAtom)

  let wins = 0
  let latestPlayer: string | undefined = undefined
  while (!latestPlayer || games[wins]?.playerId === latestPlayer) {
    const current = games[wins]
    if (!current) break
    if (!latestPlayer) {
      latestPlayer = current.playerId
    }
    wins++
  }

  return {
    handicap: calcHandicap(wins, ruleset.gamesPerPerson, ruleset.handicap),
    playerId: latestPlayer,
  }
})

export const useSpinnerHandicap = () => useAtomValue(spinnerHandicapAtom)

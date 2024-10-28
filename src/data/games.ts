import { useCallback } from "react"

import {
  createSelector,
  createSlice,
  localStorage,
  useAtomValue,
  createEffect,
} from "lib/yaasl"
import { createId } from "utils/createId"
import { dateIsValid, timeBetween, timeSince, today } from "utils/date"

import { Player, playersSlice } from "./players"

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

const sortByDate = createEffect<undefined, RawGame[]>({
  set: ({ set }) => {
    set(games => games.toSorted((a, b) => a.date.localeCompare(b.date)))
  },
})

export const gamesSlice = createSlice({
  defaultValue: [] as RawGame[],
  name: "games",
  effects: [sortByDate(), localStorage()],

  reducers: {
    add: (state, game: RawGame) => [...state, game],
    edit: (state, id: string, data: Partial<RawGame>) =>
      state.map(game => (game.id === id ? { ...game, ...data } : game)),
    remove: (state, id: string) => state.filter(game => game.id !== id),

    merge: (state, games: RawGame[]) =>
      games.reduce(
        (state, game) => {
          const gameExists = state.some(({ name }) => name === game.name)
          if (gameExists || !dateIsValid(game.date)) {
            return state
          }
          state.push(game)
          return state
        },
        [...state]
      ),
  },
})

const extendedGames = createSelector(
  [gamesSlice, playersSlice],
  (games, players) =>
    games.map(({ playerId, ...game }) => {
      const player = players.find(player => player.id === playerId)
      return { ...game, player }
    })
)

export const useGames = () => {
  const games = useAtomValue(extendedGames)

  const addGame = useCallback((data: Omit<RawGame, "id">) => {
    const game = { id: createId(), ...data }
    gamesSlice.actions.add({ id: createId(), ...data })
    return game.id
  }, [])

  return {
    games,
    addGame,
    editGame: gamesSlice.actions.edit,
    removeGame: gamesSlice.actions.remove,
  }
}

const gameStatsAtom = createSelector([gamesSlice], games => {
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

const gamePlayerStatsAtom = createSelector(
  [extendedGames, playersSlice],
  (games, players) =>
    players.map(({ id }) => {
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
)

export const useGamePlayerStats = () => useAtomValue(gamePlayerStatsAtom)

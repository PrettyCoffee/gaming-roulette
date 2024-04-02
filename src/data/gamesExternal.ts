import { useCallback, useEffect } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import { atom, expiration, localStorage, useAtom } from "@yaasl/react"

import { createId } from "~/utils/createId"
import { WEEK } from "~/utils/date"
import { parseMarkdownTable } from "~/utils/parseMarkdownTable"

import { gamesAtom } from "./games"
import { useGithub } from "./github"
import { playersAtom } from "./players"
import { fetchRepoFile } from "./service/fetchRepoFile"

export interface UserStats {
  playtime: number | undefined
  rating: number | undefined
}

export interface GameStats {
  name: string
  color?: string
  date: string
  online: UserStats
  player1: UserStats
  player2: UserStats
}

export const externalGamesAtom = atom<GameStats[] | null>({
  defaultValue: null,
  name: "games-external",
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
    expiration({ expiresIn: WEEK }),
  ],
})

const splitUserStats = (userStats: string) => {
  const [playtime, rating] = userStats
    .split(",")
    .map(stats => stats.trim().match(/^(\d+\.?\d*)/)?.[1] ?? "")
    .map(parseFloat)
    .map(value => (Number.isNaN(value) ? undefined : value))

  return {
    playtime,
    rating,
  }
}
export const useGames = () => {
  const [games, setGames] = useAtom(externalGamesAtom)
  const { filePath, incomplete } = useGithub()

  const refreshGames = useCallback(() => {
    setGames(null)
  }, [setGames])

  useEffect(() => {
    if (incomplete || games != null) return

    void fetchRepoFile(filePath)
      .then(text => {
        const games = parseMarkdownTable(text ?? "", [
          "name",
          "date",
          "online",
          "player1",
          "player2",
        ] as const)
        return games
          .filter(game => !/x/i.test(game.name))
          .map<GameStats>(game => ({
            name: game.name,
            date: game.date,
            online: splitUserStats(game.online),
            player1: splitUserStats(game.player1),
            player2: splitUserStats(game.player2),
          }))
      })
      .then(setGames)
  }, [incomplete, filePath, games, setGames])

  return { games, refreshGames }
}

externalGamesAtom.subscribe(value => {
  const players = playersAtom.get()
  const j = players.find(player => player.name.startsWith("J")) ?? players[0]!
  const f = players.find(player => player.name.startsWith("F")) ?? players[1]!
  gamesAtom.set(
    (value ?? []).map(({ date, name, player1, player2 }) => ({
      id: createId(),
      name,
      date,
      playerId: "",
      stats: {
        [f.id]: {
          playtime: player1.playtime,
          rating: player1.rating,
        },
        [j.id]: {
          playtime: player2.playtime,
          rating: player2.rating,
        },
      },
    }))
  )
})

import { useCallback, useEffect } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import { atom, expiration, localStorage, useAtom } from "@yaasl/react"

import { WEEK } from "~/utils/date"
import { parseMarkdownTable } from "~/utils/parseMarkdownTable"

import { githubAtom } from "./github"
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

const gamesAtom = atom<GameStats[] | null>({
  defaultValue: null,
  name: "games",
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
  const [games, setGames] = useAtom(gamesAtom)
  const [{ filePath }] = useAtom(githubAtom)

  const refreshGames = useCallback(() => {
    setGames(null)
  }, [setGames])

  useEffect(() => {
    if (games != null) return

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
  }, [filePath, games, setGames])

  return { games, refreshGames }
}

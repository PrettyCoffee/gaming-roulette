import { useCallback, useEffect } from "react"

import {
  atom,
  expiration,
  localStorage,
  reduxDevtools,
  useAtom,
} from "yaasl/react"

import { WEEK } from "~/utils/date"
import { parseMarkdownTable } from "~/utils/parseMarkdownTable"

import { fetchRepoFile } from "./service/fetchRepoFile"

interface UserStats {
  playtime: string
  rating: string
}

interface GameStats {
  name: string
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
  const [playtime = "", rating = ""] = userStats
    .split(",")
    .map(stats => stats.trim())
  return {
    playtime,
    rating,
  }
}
export const useGames = () => {
  const [games, setGames] = useAtom(gamesAtom)

  const refreshGames = useCallback(() => {
    setGames(null)
  }, [setGames])

  useEffect(() => {
    if (games != null) return

    void fetchRepoFile("played.md")
      .then(text => {
        const games = parseMarkdownTable(text ?? "", [
          "name",
          "date",
          "online",
          "player1",
          "player2",
        ] as const)
        return games.map<GameStats>(game => ({
          name: game.name,
          date: game.date,
          online: splitUserStats(game.online),
          player1: splitUserStats(game.player1),
          player2: splitUserStats(game.player2),
        }))
      })
      .then(setGames)
  }, [games, setGames])

  return { games, refreshGames }
}

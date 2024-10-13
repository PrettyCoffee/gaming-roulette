import { useCallback, useEffect, useState } from "react"

import { reduxDevtools } from "@yaasl/devtools"
import { createAtom, createDerived } from "@yaasl/react"

import { toast } from "~/components/Toaster"
import { createId } from "~/utils/createId"
import { dateIsValid } from "~/utils/date"
import { parseMarkdownTable } from "~/utils/parseMarkdownTable"

import { RawGame, gamesAtom } from "./games"
import { useGithub } from "./github"
import { playersAtom } from "./players"
import { fetchRepoFile } from "./service/fetchRepoFile"

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

const rawExternalData = createAtom<string | null>({
  name: "external-game-data",
  defaultValue: null,
  effects: [reduxDevtools({ disable: import.meta.env.PROD })],
})

const parsedGameData = createDerived(({ get }) => {
  const rawData = get(rawExternalData) ?? ""
  const players = get(playersAtom)

  const getPlayer = (name: string) =>
    players.find(player => player.name.toLowerCase() === name.toLowerCase())

  return parseMarkdownTable(rawData).map(({ name, game, date, ...users }) => ({
    id: createId(),
    playerId: "",
    name: name ?? game ?? "",
    date: date ?? "",
    stats: Object.fromEntries(
      Object.entries(users).map(([key, value]) => [
        getPlayer(key)?.id ?? key,
        splitUserStats(value),
      ])
    ),
  }))
})

const mergeGames = (state: RawGame[], newGames: RawGame[]) =>
  newGames.reduce(
    (state, game) => {
      const gameExists = state.some(({ name }) => name === game.name)
      if (gameExists || !dateIsValid(game.date)) {
        return state
      }
      state.push(game)
      return state
    },
    [...state]
  )

export const useExternalGames = () => {
  const [status, setStatus] = useState<"initial" | "fetching" | "idle">("idle")
  const { filePath, incomplete } = useGithub()

  const refreshGames = useCallback(() => {
    setStatus("initial")
  }, [])

  useEffect(() => {
    if (incomplete || status !== "initial") return

    setStatus("fetching")
    void fetchRepoFile(filePath)
      .then(text => {
        rawExternalData.set(text ?? "")
        const games = parsedGameData.get()
        gamesAtom.set(state => mergeGames(state, games))
      })
      .then(() => toast({ kind: "success", message: "Games synced" }))
      .catch(() => toast({ kind: "error", message: "Games could not sync" }))
      .finally(() => setStatus("idle"))
  }, [filePath, incomplete, status])

  return { status, refreshGames }
}

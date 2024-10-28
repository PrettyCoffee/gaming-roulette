import { useCallback, useEffect, useState } from "react"

import { toast } from "components/feedback/Toaster"
import { createAtom, createSelector } from "lib/yaasl"
import { createId } from "utils/createId"
import { parseMarkdownTable } from "utils/parseMarkdownTable"

import { gamesSlice } from "./games"
import { useGithub } from "./github"
import { playersSlice } from "./players"
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
})

const parsedGameData = createSelector(
  [rawExternalData, playersSlice],
  (rawData, players) => {
    const getPlayer = (name: string) =>
      players.find(player => player.name.toLowerCase() === name.toLowerCase())

    return parseMarkdownTable(rawData ?? "").map(
      ({ name, game, date, ...users }) => ({
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
      })
    )
  }
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
        gamesSlice.actions.merge(games)
      })
      .then(() => toast({ kind: "success", message: "Games synced" }))
      .catch(() => toast({ kind: "error", message: "Games could not sync" }))
      .finally(() => setStatus("idle"))
  }, [filePath, incomplete, status])

  return { status, refreshGames }
}

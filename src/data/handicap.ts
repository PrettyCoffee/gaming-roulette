import { createSelector, useAtomValue } from "~/lib/yaasl"

import { gamesSlice } from "./games"
import { rulesetAtom } from "./ruleset"

export const calcHandicap = (wins: number, max: number, severity = 0.75) => {
  if (severity <= 0) return 0
  const result = Math.pow((1 / max) * wins, 1 / severity)
  return Math.round(result * 100) / 100
}

export interface Handicap {
  wins: number
  amount: number
  playerId?: string
}

const handicapAtom = createSelector(
  [gamesSlice, rulesetAtom],
  (games, ruleset): Handicap => {
    const reversedGames = games.reverse()

    let wins = 0
    let latestPlayer: string | undefined = undefined
    while (!latestPlayer || reversedGames[wins]?.playerId === latestPlayer) {
      const current = reversedGames[wins]
      wins++
      if (!current) break
      if (!latestPlayer) {
        latestPlayer = current.playerId
      }
    }

    return {
      wins,
      amount: calcHandicap(wins, ruleset.gamesPerPerson, ruleset.handicap),
      playerId: latestPlayer,
    }
  }
)

export const useHandicap = () => useAtomValue(handicapAtom)

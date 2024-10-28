import { createSelector, useAtomValue } from "~/lib/yaasl"

import { gamesSlice } from "./games"
import { rulesetAtom } from "./ruleset"

export const calcHandicap = (wins: number, max: number, severity = 0.75) => {
  if (severity <= 0) return 0
  const successive = wins - 1
  if (successive < 1) return 0

  const result = Math.pow((1 / max) * successive, 1 / severity)
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
    const reversed = games.reverse()

    let wins = 0 // ignore the first win
    let latestPlayer: string | undefined = undefined
    while (!latestPlayer || reversed[wins]?.playerId === latestPlayer) {
      const current = reversed[wins]
      wins++
      if (!current) break
      if (!latestPlayer) {
        latestPlayer = current.playerId
      }
    }

    return {
      // Ignore one win
      wins: wins - 1,
      amount: calcHandicap(wins, ruleset.gamesPerPerson, ruleset.handicap),
      playerId: latestPlayer,
    }
  }
)

export const useHandicap = () => useAtomValue(handicapAtom)

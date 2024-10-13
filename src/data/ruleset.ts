import { createAtom, localStorage, useAtom } from "~/lib/yaasl"

const additionalRules = [
  "Costs less than 20€",
  "Up to 8 hrs",
  "Only completed games (no alpha, beta, early access)",
  "No player played the game before",
  "No chapterized games",
  "No Sonic games",
  "No concurrent games",
]

export interface Ruleset {
  gamesPerPerson: number
  allowDuplicates: boolean
  allowCrossDuplicates: boolean
  additional: string[]
  handicap: number
}

export const rulesetAtom = createAtom<Ruleset>({
  name: "ruleset",
  defaultValue: {
    gamesPerPerson: 10,
    handicap: 0.75,
    allowDuplicates: true,
    allowCrossDuplicates: true,
    additional: additionalRules,
  },
  effects: [localStorage()],
})

export const useRuleset = () => useAtom(rulesetAtom)

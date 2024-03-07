import { reduxDevtools } from "@yaasl/devtools"
import { atom, localStorage, useAtom } from "@yaasl/react"

export interface Ruleset {
  gamesPerPerson: number
  allowDuplicates: boolean
  allowCrossDuplicates: boolean
}

export const rulesetAtom = atom<Ruleset>({
  name: "ruleset",
  defaultValue: {
    gamesPerPerson: 10,
    allowDuplicates: true,
    allowCrossDuplicates: true,
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useRuleset = () => useAtom(rulesetAtom)

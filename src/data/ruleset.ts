import { reduxDevtools } from "@yaasl/devtools"
import { atom, localStorage, useAtom } from "@yaasl/react"

interface Ruleset {
  gamesPerPerson: number
}

export const rulesetAtom = atom<Ruleset>({
  name: "ruleset",
  defaultValue: {
    gamesPerPerson: 10,
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useRuleset = () => useAtom(rulesetAtom)

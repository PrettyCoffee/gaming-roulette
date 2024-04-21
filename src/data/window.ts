import { reduxDevtools } from "@yaasl/devtools"
import { atom, localStorage, useAtomValue } from "@yaasl/react"

type WindowSize = "fluid" | "static"

export const windowAtom = atom({
  name: "window",
  defaultValue: { size: "static" as WindowSize },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useWindowSize = () => useAtomValue(windowAtom).size

import { reduxDevtools } from "@yaasl/devtools"
import { createAtom, localStorage, useAtomValue } from "@yaasl/react"

type WindowSize = "fluid" | "static"

export const windowAtom = createAtom({
  name: "window",
  defaultValue: { size: "static" as WindowSize },
  effects: [localStorage(), reduxDevtools({ disable: import.meta.env.PROD })],
})

export const useWindowSize = () => useAtomValue(windowAtom).size

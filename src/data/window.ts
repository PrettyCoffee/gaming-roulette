import { createAtom, localStorage, useAtomValue } from "~/lib/yaasl"

type WindowSize = "fluid" | "static"

export const windowAtom = createAtom({
  name: "window",
  defaultValue: { size: "static" as WindowSize },
  effects: [localStorage()],
})

export const useWindowSize = () => useAtomValue(windowAtom).size

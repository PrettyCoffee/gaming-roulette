import { createAtom, useAtomValue } from "@yaasl/react"

import { debounce } from "~/utils/debounce"

const idleAtom = createAtom({
  name: "idle",
  defaultValue: false,
})

const debouncedIdle = debounce(() => idleAtom.set(true))

export const resetIdle = (ms = 3000) => {
  idleAtom.set(false)
  debouncedIdle.setTimer(ms)
}

const runListener = () => resetIdle()
window.addEventListener("keydown", runListener)
window.addEventListener("mousemove", runListener)

export const useIdle = () => {
  return useAtomValue(idleAtom)
}

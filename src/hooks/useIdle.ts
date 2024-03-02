import { atom, useAtomValue } from "@yaasl/react"

const idleAtom = atom({
  name: "idle",
  defaultValue: false,
})

let timer: number
export const resetIdle = () => {
  idleAtom.set(false)
  clearTimeout(timer)
  timer = window.setTimeout(() => idleAtom.set(true), 3000)
}
window.addEventListener("keydown", resetIdle)
window.addEventListener("mousemove", resetIdle)

export const useIdle = () => {
  return useAtomValue(idleAtom)
}

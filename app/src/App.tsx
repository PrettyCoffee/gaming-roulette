import { PropsWithChildren, useEffect, useRef, useState } from "react"

import { AnimatePresence, m } from "framer-motion"

import sleepingGif from "~/assets/sleepy-sleeping.gif"

import { WindowTitlebar } from "./components/WindowTitlebar"
import { useWindowFocus } from "./hooks/useWindowFocus"
import { Pages } from "./pages/Pages"
import { cn } from "./utils/utils"

const inital = {
  opacity: 0,
  transform: "translate(-100%, 100%)",
}
const display = {
  opacity: 1,
  transform: "translate(0%, 0%)",
}
const exit = {
  opacity: 0,
  transform: "translate(100%, -100%)",
}

const Fader = ({ children, show }: PropsWithChildren<{ show: boolean }>) => (
  <AnimatePresence>
    {show && (
      <m.div
        className="fixed bottom-2 right-2 z-50"
        initial={inital}
        animate={display}
        exit={exit}
      >
        {children}
      </m.div>
    )}
  </AnimatePresence>
)

const useMouseIdle = (timeout = 3000) => {
  const [isIdle, setIsIdle] = useState(false)
  const cleanup = useRef<() => void>(() => null)

  useEffect(() => {
    cleanup.current()

    let timer: number
    const handleMouseMove = () => {
      setIsIdle(false)
      clearTimeout(timer)
      timer = window.setTimeout(() => setIsIdle(true), timeout)
    }

    window.addEventListener("mousemove", handleMouseMove)

    cleanup.current = () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }

    return () => cleanup.current()
  }, [timeout])

  return isIdle
}

export const App = () => {
  const isFocused = useWindowFocus()
  const isIdle = useMouseIdle()

  return (
    <div className="max-h-screen h-full overflow-hidden flex flex-col">
      <WindowTitlebar>
        <img
          src="/logo.svg"
          alt="Gaming Roulette"
          className={cn(
            "transition-all ml-3 w-6 h-6 select-none pointer-events-none"
          )}
        />
        <span className="pl-3 text-muted-foreground text-sm font-bold select-none pointer-events-none">
          Gaming Roulette
        </span>
      </WindowTitlebar>
      <Pages />
      <Fader show={!isFocused || isIdle}>
        <img
          src={sleepingGif}
          alt=""
          className="h-12 opacity-50 object-contain"
        />
      </Fader>
    </div>
  )
}

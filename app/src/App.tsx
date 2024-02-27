import { PropsWithChildren } from "react"

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

export const App = () => {
  const isFocused = useWindowFocus()

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
      <Fader show={!isFocused}>
        <img
          src={sleepingGif}
          alt=""
          className="h-10 opacity-50 object-contain"
        />
      </Fader>
    </div>
  )
}

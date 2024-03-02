import { PropsWithChildren } from "react"

import { AnimatePresence, m } from "framer-motion"

import sleepingGif from "~/assets/sleepy-sleeping.gif"
import { useIdle } from "~/hooks/useIdle"
import { useWindowFocus } from "~/hooks/useWindowFocus"

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

export const IdleIndicator = () => {
  const isFocused = useWindowFocus()
  const isIdle = useIdle()

  return (
    <Fader show={!isFocused || isIdle}>
      <img
        src={sleepingGif}
        alt=""
        className="h-12 opacity-50 object-contain"
      />
    </Fader>
  )
}

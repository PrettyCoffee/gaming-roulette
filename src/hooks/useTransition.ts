import { RefObject, useEffect, useMemo, useRef, useState } from "react"

import { useEventListener } from "./useEventListener"

interface TransitionStyles {
  whileShow?: string
  toShow?: string
  toHide?: string
  whileHide?: string
}

type TransitionState =
  | "start-hide"
  | "to-hide"
  | "hide"
  | "start-show"
  | "to-show"
  | "show"

const noStyles: Required<TransitionStyles> = {
  whileShow: "",
  toShow: "",
  toHide: "",
  whileHide: "",
}

const getStyles = (state: TransitionState, styles?: TransitionStyles) => {
  const { whileShow, toShow, toHide, whileHide } = { ...noStyles, ...styles }
  switch (state) {
    case "start-hide":
      return `${toShow}`
    case "to-hide":
      return `${toHide}`
    case "hide":
      return `${whileHide} ${toHide}`
    case "start-show":
      return `${toHide}`
    case "to-show":
      return `${toShow}`
    case "show":
      return `${whileShow} ${toShow}`
  }
}

const getState = (transition: "idle" | "start" | "running", hide: boolean) => {
  if (transition === "start") {
    return hide ? "start-hide" : "start-show"
  }
  if (transition === "running") {
    return hide ? "to-hide" : "to-show"
  }
  return hide ? "hide" : "show"
}

interface TransitionProps {
  ref: RefObject<HTMLElement | null>
  hide: boolean
  styles?: TransitionStyles
}
export const useTransition = ({ ref, hide, styles }: TransitionProps) => {
  const [transition, setTransition] = useState<"idle" | "start" | "running">(
    "idle"
  )
  const lastHide = useRef(hide)

  useEffect(() => {
    if (lastHide.current === hide) return
    lastHide.current = hide
    setTransition("start")
  }, [hide])

  useEffect(() => {
    if (transition !== "start") return

    const duration = !ref.current
      ? 0
      : parseFloat(window.getComputedStyle(ref.current).transitionDuration)

    setTransition(duration === 0 ? "idle" : "running")
  }, [ref, transition])

  useEventListener({
    ref: ref.current,
    event: "transitionend",
    handler: () => {
      setTransition("idle")
    },
  })

  return useMemo(() => {
    const state = getState(transition, lastHide.current)
    return {
      state,
      className: getStyles(state, styles),
    }
  }, [styles, transition])
}

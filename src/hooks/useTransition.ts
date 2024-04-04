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
    setTransition("running")
  }, [transition])

  useEventListener({
    ref: ref.current,
    event: "transitionend",
    handler: () => {
      console.log("transitionend")
      setTransition("idle")
    },
  })

  const state = useMemo(
    () => getState(transition, lastHide.current),
    [transition]
  )

  return {
    state,
    className: getStyles(state, styles),
  }
}

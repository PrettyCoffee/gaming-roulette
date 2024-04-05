import { useState } from "react"

import { m } from "framer-motion"
import { css, keyframes } from "goober"

import { textColor } from "~/utils/colors"
import { cn } from "~/utils/utils"

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
}

export const Loading2 = () => (
  <m.svg
    width="600"
    height="600"
    viewBox="0 0 600 600"
    initial="hidden"
    animate="visible"
  >
    <m.circle
      className={cn(
        textColor({ color: "red" }),
        "bg-transparent stroke-current"
      )}
      strokeWidth={5}
      cx="100"
      cy="100"
      r="80"
      variants={draw}
    />
  </m.svg>
)

const strokeOffset = keyframes`
  0% { stroke-dasharray: 0 150; stroke-dashoffset: 0; }
  47.5% { stroke-dasharray: 42 150; stroke-dashoffset: -16; }
  95%,100% { stroke-dasharray: 42 150; stroke-dashoffset: -59; }
`

const circle = css`
  animation: ${strokeOffset} 2s ease-in-out infinite;
`

export const Loading = () => {
  const [defer, setDefer] = useState(true)
  if (defer) {
    setTimeout(() => setDefer(false), 200)
    return null
  }
  return (
    <div className="flex size-full items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="size-24 stroke-muted-foreground"
      >
        <g className="origin-center animate-spin duration-1000">
          <circle
            className={cn(circle)}
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

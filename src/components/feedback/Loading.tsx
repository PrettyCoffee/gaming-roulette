import { useEffect, useState } from "react"

import { css, keyframes } from "goober"

import { cn } from "utils/utils"

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

  useEffect(() => {
    if (!defer) return
    setTimeout(() => setDefer(false), 200)
  }, [defer])

  return defer ? null : (
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

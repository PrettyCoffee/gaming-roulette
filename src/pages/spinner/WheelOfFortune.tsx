import { useEffect, useRef, useState } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { useSize } from "~/hooks/useSize"
import { cn } from "~/utils/utils"

import { SpinnerItem, SpinnerStateProps } from "./Spinner"

const Caret = styled.div<{ radius: number }>(
  ({ radius }) => css`
    position: absolute;
    --caret-size: ${radius / 15}px;
    transform: translateX(calc(${radius}px + var(--caret-size)));
    width: var(--caret-size);
    height: var(--caret-size);

    background: currentColor;
    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
  `
)

const Winner = ({ color = "", game = "" }: Partial<SpinnerItem>) => (
  <div
    className={cn(
      "absolute text-xl z-10 px-4 py-2 bg-base/90 rounded-md",
      `border-2 border-${color}-200`
    )}
  >
    {game}
    <span className="absolute -top-8 -right-12 text-5xl">🎉</span>
    <span className="absolute -top-8 -left-12 text-5xl scale-x-[-1]">🎉</span>
  </div>
)

const WheelSegment = ({
  index,
  color,
  game,
  items,
  radius,
}: SpinnerItem & { index: number; items: number; radius: number }) => {
  const angle = (2 * Math.PI) / items
  const segmentSize = Math.tan(angle / 2) * radius * 2

  return (
    <div
      className="absolute flex items-center justify-end pr-[1em] w-32 bg-black"
      style={{
        width: radius,
        height: segmentSize,
        clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
        transform: `rotate(-${(360 / items) * index}deg) translate(0, -50%)`,
        transformOrigin: "0 0",
      }}
    >
      <span
        className={cn(
          "inline-block max-w-[75%] whitespace-nowrap text-foreground font-bold overflow-hidden text-ellipsis",
          game.length > 15
            ? "text-[0.5em]"
            : game.length > 10
            ? "text-[0.625em]"
            : "text-[0.75em]"
        )}
      >
        {game}
      </span>
      <span
        className={cn(
          "absolute right-[0.25em] top-[0.25em] bottom-[0.25em] w-[0.25em] rounded-full",
          `bg-${color}-200`
        )}
      />
    </div>
  )
}
export const WheelOfFortune = ({
  current = 0,
  items,
  transitionDuration,
  winner,
}: SpinnerStateProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const size = useSize(ref)
  const [rounds, setRounds] = useState(-1)

  useEffect(() => {
    if (current === 0) {
      setRounds(prev => prev + 1)
    }
  }, [current, items.length])

  const rotation = Math.floor((360 / items.length) * current + rounds * 360)

  const diameter = Math.min(size.width, size.height)
  const radius = diameter / 2

  return (
    <div
      ref={ref}
      className="relative h-full w-full flex items-center justify-center"
    >
      <Caret radius={radius} className="text-foreground" />
      {winner != null && <Winner {...items[winner]} />}
      <div
        className="h-full w-full flex justify-center items-center rounded-full overflow-hidden select-none"
        style={{
          height: diameter,
          width: diameter,
          fontSize: diameter / 20,
          opacity: winner ? "0.5" : undefined,
        }}
      >
        <div
          className="relative w-0 h-0"
          style={{
            transitionTimingFunction: "linear",
            transitionDuration: `${transitionDuration * 1.2}ms`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {items.map((item, index) => (
            <WheelSegment
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              items={items.length}
              radius={radius}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

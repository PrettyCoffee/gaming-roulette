import { useRef } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { useSize } from "~/hooks/useSize"
import { cn } from "~/utils/utils"

import { SpinnerStateProps } from "./Spinner"

const Preserve3D = styled.div`
  perspective: 800;
  transform-style: preserve-3d;
  /*
  transform: rotateX(-5deg) rotateY(95deg) rotateZ(-5deg);
  */
`

const rotateArrayIndex = (items: number, current: number, step = 1) =>
  // items * 2 is needed to make sure the index is always positive
  (current + step + items * 2) % items

const getItemPosition = (items: number, index: number, active: number) => {
  if (index === active) {
    return 0
  }
  switch (index) {
    case rotateArrayIndex(items, active, 1):
      return 1
    case rotateArrayIndex(items, active, -1):
      return -1
    case rotateArrayIndex(items, active, 2):
      return 2
    case rotateArrayIndex(items, active, -2):
      return -2
    case rotateArrayIndex(items, active, 3):
      return 3
    case rotateArrayIndex(items, active, -3):
      return -3
    default:
      return 4
  }
}

const rotation: Record<number, number> = {
  3: 90,
  2: 65,
  1: 30,
  0: 0,
  "-1": -30,
  "-2": -65,
  "-3": -90,
}

const offsetY: Record<number, number> = {
  3: -9,
  2: -7.95,
  1: -4.7,
  0: 0,
  "-1": 4.7,
  "-2": 7.95,
  "-3": 9,
}

const offsetZ: Record<number, number> = {
  3: -9.5,
  2: -4.8,
  1: -1.25,
  0: 0,
  "-1": -1.25,
  "-2": -4.8,
  "-3": -9.5,
}

const opacityByPosition: Record<number, number> = {
  3: 0,
  2: 0.3,
  1: 0.6,
  0: 1,
  "-1": 0.6,
  "-2": 0.3,
  "-3": 0,
}

const getStyles = (items: number, index: number, active: number) => {
  const position = getItemPosition(items, index, active)
  const rotate = rotation[position] ?? 0
  const y = (offsetY[position] ?? 0) - 2.5
  const z = offsetZ[position] ?? 0
  if (position === 4) return "display: none;"

  return css`
    opacity: ${opacityByPosition[position] ?? 0};
    transform: perspective(1000px) translateY(${y * 0.9}em)
      translateZ(${z * 0.9}em) rotateX(${rotate}deg);
  `
}

interface WheelSegmentProps {
  items: number
  index: number
  active: number
}

const WheelSegment = styled.div<WheelSegmentProps>(
  ({ active, index, items }) => css`
    ${getStyles(items, index, active)}
  `
)

export const Wheel = ({
  current,
  items,
  winner,
  transitionDuration,
}: SpinnerStateProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { height, width } = useSize(ref)
  const size = Math.min(height, width)
  return (
    <Preserve3D
      ref={ref}
      className="w-full h-full flex flex-col items-center relative"
    >
      {items.map(({ game, color }, index) => (
        <WheelSegment
          // eslint-disable-next-line react/no-array-index-key
          key={game + String(index)}
          active={current ?? 0}
          index={index}
          items={items.length}
          className={cn(
            "absolute w-[24em] h-[4.5em] px-[2em] whitespace-nowrap text-ellipsis rounded-md flex items-center justify-center top-1/2 bg-muted",
            index === winner && "bg-green-500"
          )}
          style={{
            fontSize: size / 15,
            transitionDuration: `${transitionDuration + 10}ms`,
            transitionTimingFunction: "linear",
          }}
        >
          <span className="text-[1.75em] whitespace-nowrap text-ellipsis overflow-hidden">
            {game}
          </span>
          <span
            className={cn(
              "absolute left-[0.3em] top-[0.3em] bottom-[0.3em] w-[0.2em] rounded-full opacity-75",
              `bg-${color}-200`
            )}
          />
          {index === winner && (
            <span className="absolute -top-8 -right-16 text-7xl">🎉</span>
          )}
        </WheelSegment>
      ))}
    </Preserve3D>
  )
}

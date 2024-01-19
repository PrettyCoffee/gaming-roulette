import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { cn } from "~/utils/utils"

import { SpinnerItem } from "./Spinner"

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
    transform: perspective(1000px) translateY(${y}rem) translateZ(${z}rem)
      rotateX(${rotate}deg);
  `
}

interface WheelSegmentProps {
  items: number
  index: number
  active: number
}

const WheelSegment = styled.div<WheelSegmentProps>(
  ({ active, index, items }) => css`
    transition: 250ms;
    ${getStyles(items, index, active)}
  `
)

interface WheelProps {
  items: SpinnerItem[]
  current?: number
  winner?: number
  transitionDuration: number
}
export const Wheel = ({
  current,
  items,
  winner,
  transitionDuration,
}: WheelProps) => (
  <Preserve3D className="w-80 flex flex-col items-center h-72 relative">
    {items.map(({ game }, index) => (
      <WheelSegment
        // eslint-disable-next-line react/no-array-index-key
        key={game + String(index)}
        active={current ?? 0}
        index={index}
        items={items.length}
        className={cn(
          "absolute w-96 h-20 text-3xl px-4 whitespace-nowrap text-ellipsis rounded-md flex items-center justify-center top-1/2 bg-muted",
          index === winner && "bg-green-500"
        )}
        style={{
          transitionDuration: `${transitionDuration + 10}ms`,
          transitionTimingFunction: "linear",
        }}
      >
        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
          {game}
        </span>
        {index === winner && (
          <span className="absolute -top-8 -right-16 text-7xl">🎉</span>
        )}
      </WheelSegment>
    ))}
  </Preserve3D>
)

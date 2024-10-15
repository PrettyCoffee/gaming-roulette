import { useRef } from "react"

import { css } from "goober"

import { CopyClick } from "~/components/buttons/CopyClick"
import { useSize } from "~/hooks/useSize"
import { bgColor } from "~/utils/colors"
import { cn } from "~/utils/utils"

import { SpinnerStateProps } from "./Spinner"

const preserve3d = css`
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

interface SegmentProps {
  items: number
  index: number
  active: number
}
const segment = ({ active, index, items }: SegmentProps) => {
  const position = getItemPosition(items, index, active)
  const rotate = rotation[position] ?? 0
  const y = (offsetY[position] ?? 0) - 2.5
  const z = offsetZ[position] ?? 0
  if (position === 4) return "hidden"

  return css`
    opacity: ${opacityByPosition[position] ?? 0};
    transform: perspective(1000px) translateY(${y * 0.9}em)
      translateZ(${z * 0.9}em) rotateX(${rotate}deg);
  `
}

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
    <div
      ref={ref}
      className={cn(
        "relative flex size-full flex-col items-center",
        preserve3d
      )}
    >
      {items.map(({ name, player }, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={name + String(index)}
          className={cn(
            "absolute top-1/2 flex h-[4.5em] w-[24em] items-center justify-center text-ellipsis whitespace-nowrap rounded-md bg-muted px-[2em]",
            index === winner && "bg-green-500",
            segment({ active: current ?? 0, index, items: items.length })
          )}
          style={{
            fontSize: size / 15,
            transitionDuration: `${transitionDuration + 10}ms`,
            transitionTimingFunction: "linear",
          }}
        >
          <span className="truncate text-[1.75em]">{name}</span>
          <span
            className={cn(
              "absolute inset-y-[0.3em] left-[0.3em] w-[0.2em] rounded-full opacity-75",
              bgColor({ color: player.color })
            )}
          />
          {index === winner && (
            <>
              <CopyClick text={name} size="lg" />
              <span className="absolute -right-16 bottom-2 select-none text-7xl">
                🎉
              </span>
              <span className="absolute -left-16 bottom-2 -scale-x-100 select-none text-7xl">
                🎉
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

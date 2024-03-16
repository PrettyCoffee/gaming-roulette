import { cn } from "~/utils/utils"

import { SpinnerItem } from "./Spinner"

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
      className="absolute flex w-32 items-center justify-end bg-black pr-[1em]"
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
          "inline-block max-w-[75%] truncate font-bold text-foreground",
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
          "absolute inset-y-[0.25em] right-[0.25em] w-[0.25em] rounded-full",
          `bg-${color}-200`
        )}
      />
    </div>
  )
}

interface WheelOfFortuneProps {
  diameter: number
  rotation: number
  items: SpinnerItem[]
  transitionDuration: number
}

export const WheelOfFortune = ({
  diameter,
  rotation,
  items,
  transitionDuration,
}: WheelOfFortuneProps) => {
  const radius = diameter / 2
  const fontSize = diameter / 20

  return (
    <div
      className="flex size-full select-none items-center justify-center rounded-full"
      style={{
        height: diameter,
        width: diameter,
        fontSize,
      }}
    >
      <div
        className="relative size-0"
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
  )
}

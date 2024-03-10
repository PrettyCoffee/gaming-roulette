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
      className="h-full w-full flex justify-center items-center rounded-full overflow-hidden select-none"
      style={{
        height: diameter,
        width: diameter,
        fontSize,
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
  )
}

import { useEffect, useRef, useState } from "react"

import { ChevronLeft } from "lucide-react"

import { Icon } from "~/components/Icon"
import { useSize } from "~/hooks/useSize"
import { cn } from "~/utils/utils"

import { SpinnerItem, SpinnerStateProps } from "./Spinner"
import { WheelOfFortune } from "./WheelOfFortune"

const Winner = ({ player, name = "" }: Partial<SpinnerItem>) => (
  <div
    className={cn(
      "absolute z-10 rounded-md bg-base/90 px-4 py-2 text-xl",
      `border-${player?.color ?? ""}-200 border-2`
    )}
  >
    {name}
    <span className="absolute -right-12 -top-8 text-5xl">🎉</span>
    <span className="absolute -left-12 -top-8 -scale-x-100 text-5xl">🎉</span>
  </div>
)

export const ClassicWheel = ({
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
      className="relative flex size-full items-center justify-center"
    >
      <div
        className="absolute flex h-max items-center"
        style={{
          transform: `translateX(calc(${radius}px + 0.5em))`,
          fontSize: diameter / 20,
        }}
      >
        <Icon
          icon={ChevronLeft}
          strokeWidth={"auto"}
          className="size-[1.2em]"
        />
      </div>
      {winner != null && <Winner {...items[winner]} />}
      <WheelOfFortune
        diameter={diameter}
        items={items}
        rotation={rotation}
        transitionDuration={transitionDuration}
      />
    </div>
  )
}

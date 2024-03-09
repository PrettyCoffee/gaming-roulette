import { useEffect, useRef, useState } from "react"

import { ChevronLeft } from "lucide-react"

import { Icon } from "~/components/Icon"
import { useSize } from "~/hooks/useSize"
import { cn } from "~/utils/utils"

import { SpinnerItem, SpinnerStateProps } from "./Spinner"
import { WheelOfFortune } from "./WheelOfFortune"

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
      className="relative h-full w-full flex items-center justify-center"
    >
      <div
        className="absolute h-max flex items-center"
        style={{
          transform: `translateX(calc(${radius}px + 0.5em))`,
          fontSize: diameter / 20,
        }}
      >
        <Icon
          icon={ChevronLeft}
          strokeWidth={"auto"}
          className="h-[1.2em] w-[1.2em]"
        />
      </div>
      {winner != null && <Winner {...items[winner]} />}
      <WheelOfFortune
        diameter={diameter}
        items={items}
        rotation={rotation}
        transitionDuration={transitionDuration}
        fontSize={diameter / 20}
      />
    </div>
  )
}

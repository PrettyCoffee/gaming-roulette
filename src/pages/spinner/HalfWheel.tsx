import { useEffect, useRef, useState } from "react"

import { ChevronDown } from "lucide-react"

import { Icon } from "~/components/Icon"
import { useSize } from "~/hooks/useSize"
import { cn } from "~/utils/utils"

import { SpinnerItem, SpinnerStateProps } from "./Spinner"
import { WheelOfFortune } from "./WheelOfFortune"

const Winner = ({ color = "", game = "" }: Partial<SpinnerItem>) => (
  <div
    className={cn(
      "absolute text-xl z-10 px-4 py-2 bg-base/75 bottom-12 backdrop-blur-sm",
      `border-2 rounded-md border-${color}-200`
    )}
  >
    {game}
    <span className="absolute -top-8 -right-12 text-5xl">🎉</span>
    <span className="absolute -top-8 -left-12 text-5xl scale-x-[-1]">🎉</span>
  </div>
)

export const HalfWheel = ({
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

  const rotation =
    Math.floor((360 / items.length) * current + rounds * 360) - 90

  const diameter = Math.min(size.width, size.height * 2)
  const radius = diameter / 2
  console.log(size)
  return (
    <div
      ref={ref}
      className="relative h-full w-full flex items-end justify-center"
    >
      <div
        className="z-50 absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-background to-transparent"
        style={{ height: radius / 5 }}
      />
      <div
        className="absolute h-max flex items-center"
        style={{
          bottom: radius - radius / 5,
          fontSize: radius / 10,
        }}
      >
        <Icon
          icon={ChevronDown}
          strokeWidth={"auto"}
          className="h-[1em] w-[1em]"
        />
      </div>
      {winner != null && <Winner {...items[winner]} />}
      <div
        className="overflow-hidden"
        style={{ height: radius, paddingTop: radius / 5 }}
      >
        <WheelOfFortune
          diameter={diameter}
          items={items}
          rotation={rotation}
          transitionDuration={transitionDuration}
        />
      </div>
    </div>
  )
}

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
      "absolute bottom-12 z-10 bg-base/75 px-4 py-2 text-xl backdrop-blur-sm",
      `border- rounded-md border-2${color}-200`
    )}
  >
    {game}
    <span className="absolute -right-12 -top-8 text-5xl">🎉</span>
    <span className="absolute -left-12 -top-8 -scale-x-100 text-5xl">🎉</span>
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
  return (
    <div ref={ref} className="relative flex size-full items-end justify-center">
      <div
        className="absolute inset-x-0 bottom-0 z-50 w-full bg-gradient-to-t from-background to-transparent"
        style={{ height: radius / 5 }}
      />
      <div
        className="absolute flex h-max items-center"
        style={{
          bottom: radius - radius / 5,
          fontSize: radius / 10,
        }}
      >
        <Icon icon={ChevronDown} strokeWidth={"auto"} className="size-[1em]" />
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

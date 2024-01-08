import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { shuffle } from "~/utils/array"
import { randomIntBetween } from "~/utils/number"
import { cn } from "~/utils/utils"
import {  Dices } from "lucide-react"
import { ClassNameProp } from "~/components/base/BaseProps"
import { noOverflow } from "~/utils/styles"

import clickSound from "~/assets/click.mp3"
import { usePlayers } from "~/data/players"
import { Button } from "~/components/ui/button"
import { Icon } from "~/components/Icon"
import { Wheel } from "./Wheel"
import { useSettings } from "~/data/settings"

new Audio(clickSound) // preload
const playClickSound = () => new Audio(clickSound).play()

interface PillProps extends ClassNameProp {
  color: "blue" | "red"
  transition?: number
}

const Pill = ({ color, children, className, transition }: PropsWithChildren<PillProps>) => (
  <span
    className={cn(
      "px-2 py-0.5 bg-muted rounded-md max-w-[theme(width.48)] font-medium",
      noOverflow,
      color === "red"
        ? "bg-red-200 text-red-950"
        : "bg-blue-200 text-blue-950",
      className
    )}
    style={{
      transitionDuration: `${transition}ms`
    }}
  >
    {children}
  </span>
)

const useNumberRotation = (max: number) => {
  const [current, setCurrent] = useState<number | null>(null)
  const [transition, setTransition] = useState<number | null>(null)
  const [winner, setWinner] = useState<number | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const rotate = useCallback((
    prev = current,
    winner = randomIntBetween(0, max - 1),
    speed = -100
  ) => {
    const next = prev == null ? 0 : (prev + 1) % max
    setCurrent(next)

    if (speed >= 200 && next === winner) {
      setTimeout(() => {
        setWinner(winner)
      }, speed)
      return;
    }

    const change = Math.max((Math.abs(speed) / 20), 1)
    const transition = Math.max(Math.abs(speed), 10)
    setTransition(transition)

    setTimeout(() => playClickSound(), transition / 2)
    timeoutRef.current = setTimeout(() => rotate(next, winner, speed + change), transition)
  }, [max])

  const reset = useCallback(
    () => {
      setCurrent(null);
      setWinner(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }, []
  )

  useEffect(() => reset, [reset])

  return { current, rotate, reset, transition, winner }
}

export const Spinner = () => {
  const [settings] = useSettings()
  const { players } = usePlayers()
  const games1 = players.player1.games
  const games2 = players.player2.games

  const items = useMemo(() => {
    const items = [...games1.filter(Boolean).slice(0, 10), ...games2.filter(Boolean).slice(0, 10)]
    return shuffle(items)
  }, [games1, games2])

  const { current, rotate, winner, transition } = useNumberRotation(items.length)

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      {settings.pickerView === "wheel" ? (
        <Wheel
          items={items}
          current={current ?? undefined}
          winner={winner != null ? items[winner] : undefined}
          transitionDuration={transition ?? 0}
        />
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {items.map((value, i) => (
            <Pill
              key={i}
              color={games1.includes(value) ? "red" : "blue"}
              className={cn(
                "transition-all duration-150",
                current == null ? "" : current === i ? "scale-105" : "opacity-10"
              )}
              transition={transition ?? undefined}
            >
              {i + 1}. {value}
            </Pill>
          ))}
        </div>
      )}
      <Button
        variant={"outline"}
        onClick={() => rotate()}
        className="w-1/2 gap-2"
      >
        <Icon icon={Dices}/>
        Spin
      </Button>
    </div>
  )
}

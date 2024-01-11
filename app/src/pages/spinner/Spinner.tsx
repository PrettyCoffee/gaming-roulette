import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { create as createConfetti } from "canvas-confetti"
import { Dices } from "lucide-react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click.mp3"
// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import victorySound from "~/assets/victory.mp3"
import { Icon } from "~/components/Icon"
import { Button } from "~/components/ui/button"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { shuffle } from "~/utils/array"
import { randomIntBetween } from "~/utils/number"
import { playAudio } from "~/utils/playAudio"

import { Tags } from "./Tags"
import { Wheel } from "./Wheel"

const playClickSound = () => void playAudio(clickSound)
const playVictory = () => void playAudio(victorySound)

const useNumberRotation = (max: number) => {
  const [current, setCurrent] = useState<number | null>(null)
  const [transition, setTransition] = useState<number | null>(null)
  const [winner, setWinner] = useState<number | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const rotate = useCallback(
    (prev = current, winner = randomIntBetween(0, max - 1), speed = -100) => {
      const next = prev == null ? 0 : (prev + 1) % max
      setCurrent(next)

      if (speed >= 200 && next === winner) {
        setTimeout(() => {
          setWinner(winner)
        }, speed)
        return
      }

      const change = Math.max(Math.abs(speed) / 20, 1)
      const transition = Math.max(Math.abs(speed), 10)
      setTransition(transition)

      setTimeout(() => playClickSound(), transition / 2)
      timeoutRef.current = setTimeout(
        () => rotate(next, winner, speed + change),
        transition
      )
    },
    [max, current]
  )

  const reset = useCallback(() => {
    setCurrent(null)
    setWinner(null)
    setTransition(null)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => reset, [reset])

  return { current, rotate, reset, transition, winner }
}

export const Spinner = () => {
  const [settings] = useSettings()
  const { players } = usePlayers()
  const games1 = players.player1.games
  const games2 = players.player2.games

  const items = useMemo(() => {
    const items = [
      ...games1.filter(Boolean).slice(0, 10),
      ...games2.filter(Boolean).slice(0, 10),
    ]
    return shuffle(items)
  }, [games1, games2])

  const { current, rotate, reset, winner, transition } = useNumberRotation(
    items.length
  )

  const canvas = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvas.current || winner == null) return
    playVictory()

    const confetti = createConfetti(canvas.current, { resize: true })
    const settings = {
      particleCount: 100,
      spread: 75,
      colors: [
        "#ef4444",
        "#f59e0b",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#a855f7",
      ],
    }
    void confetti({
      ...settings,
      origin: { x: 0, y: 1 },
      angle: 90 - 30,
    })
    void confetti({
      ...settings,
      origin: { x: 1, y: 1 },
      angle: 90 + 30,
    })
  }, [winner])

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-center gap-2">
      {settings.pickerView === "wheel" ? (
        <Wheel
          items={items}
          current={current ?? undefined}
          winner={winner ?? undefined}
          transitionDuration={transition ?? 0}
        />
      ) : (
        <Tags
          items={items}
          items1={games1}
          items2={games2}
          current={current ?? undefined}
          winner={winner ?? undefined}
          transitionDuration={transition ?? 0}
        />
      )}
      <canvas
        className="absolute -inset-4 h-[calc(100%+theme(height.4)*2)] w-[calc(100%+theme(width.4)*2)]  pointer-events-none"
        ref={canvas}
      />
      <Button
        variant={"outline"}
        onClick={() => {
          reset()
          rotate()
        }}
        className="w-1/2 gap-2"
      >
        <Icon icon={Dices} />
        Spin
      </Button>
    </div>
  )
}

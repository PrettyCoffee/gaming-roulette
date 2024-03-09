import { useEffect, useMemo, useRef } from "react"

import { create as createConfetti } from "canvas-confetti"
import { Dices } from "lucide-react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import victorySound from "~/assets/victory.mp3"
import { Icon } from "~/components/Icon"
import { Button } from "~/components/ui/button"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { resetIdle } from "~/hooks/useIdle"
import { shuffle } from "~/utils/array"
import { playAudio } from "~/utils/playAudio"

import { ClassicWheel } from "./ClassicWheel"
import { HalfWheel } from "./HalfWheel"
import { Tags } from "./Tags"
import { useNumberRotation } from "./useNumberRotation"
import { Wheel } from "./Wheel"

const playVictory = () => void playAudio(victorySound)

const popConfetti = (canvas: HTMLCanvasElement) => {
  const confetti = createConfetti(canvas, { resize: true })
  const settings = {
    particleCount: 100,
    spread: 75,
    colors: ["#ef4444", "#f59e0b", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7"],
  }
  resetIdle(6000)
  const a = confetti({
    ...settings,
    origin: { x: 0, y: 1 },
    angle: 90 - 30,
  })
  const b = confetti({
    ...settings,
    origin: { x: 1, y: 1 },
    angle: 90 + 30,
  })
  void Promise.all([a, b]).then(() => resetIdle())
}

export interface SpinnerItem {
  game: string
  color: string
}

export interface SpinnerStateProps {
  items: SpinnerItem[]
  current?: number
  winner?: number
  transitionDuration: number
}

export const Spinner = () => {
  const [settings] = useSettings()
  const { players } = usePlayers()

  const items: SpinnerItem[] = useMemo(() => {
    const items = players
      .flatMap(({ games, color }) => games.map(game => ({ game, color })))
      .filter(Boolean)
    return shuffle(items)
  }, [players])

  const { current, rotate, reset, winner, transition } = useNumberRotation(
    items.length
  )

  const canvas = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvas.current || winner == null) return
    playVictory()
    popConfetti(canvas.current)
  }, [winner])

  if (items.length === 0)
    return (
      <div className="h-full flex-col gap-2 flex items-center justify-center">
        <div className="font-bold text-2xl text-muted-foreground">No games</div>
        <div className="text-sm text-muted-foreground">
          You must add some games first before you can spin the wheel.
        </div>
      </div>
    )

  const props: SpinnerStateProps = {
    items,
    current: current ?? undefined,
    winner: winner ?? undefined,
    transitionDuration: transition ?? 0,
  }

  return (
    <div className="relative h-full flex-1 flex flex-col items-center justify-center gap-2">
      {settings.pickerView === "wheel" ? (
        <Wheel {...props} />
      ) : settings.pickerView === "classic-wheel" ? (
        <ClassicWheel {...props} />
      ) : settings.pickerView === "half-wheel" ? (
        <HalfWheel {...props} />
      ) : (
        <Tags {...props} />
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

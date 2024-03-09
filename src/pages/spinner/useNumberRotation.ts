import { useCallback, useEffect, useRef, useState } from "react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click-enhanced.mp3"
import { audioSettingsAtom } from "~/data/audioSettings"
import { resetIdle } from "~/hooks/useIdle"
import { randomIntBetween } from "~/utils/number"
import { playAudio } from "~/utils/playAudio"

const playClickSound = () =>
  void playAudio(clickSound, { volume: audioSettingsAtom.get().spinnerVolume })

export const useNumberRotation = (max: number) => {
  const [current, setCurrent] = useState<number | null>(null)
  const [transition, setTransition] = useState<number | null>(null)
  const [winner, setWinner] = useState<number | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const rotate = useCallback(
    (prev = current, winner = randomIntBetween(0, max - 1), speed = -100) => {
      resetIdle()
      const transition = Math.max(Math.abs(speed), 10)
      setTransition(transition)
      setTimeout(() => playClickSound(), transition / 2)

      const next = prev == null ? 0 : (prev + 1) % max
      setCurrent(next)

      if (speed >= 200 && next === winner) {
        setTimeout(() => {
          setWinner(winner)
        }, speed)
        return
      }

      const change = Math.max(Math.abs(speed) / 20, 1)

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

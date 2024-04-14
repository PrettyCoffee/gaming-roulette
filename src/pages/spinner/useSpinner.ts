import { useCallback, useEffect, useRef, useState } from "react"

import clickSound from "~/assets/click-enhanced.mp3"
import { audioSettingsAtom } from "~/data/audioSettings"
import { useSpinnerHandicap } from "~/data/games"
import { Player } from "~/data/players"
import { resetIdle } from "~/hooks/useIdle"
import { randomBetween, sum } from "~/utils/number"
import { playAudio } from "~/utils/playAudio"

const playClickSound = () =>
  playAudio(clickSound, { volume: audioSettingsAtom.get().spinnerVolume })

const getWinner = (
  games: { player: Player; name: string }[],
  handicap: { handicap: number; playerId?: string }
) => {
  const values = games.map(({ player }) =>
    handicap.playerId === player.id ? 1 - handicap.handicap : 1
  )
  const max = sum(values)
  const winnerValue = randomBetween(0, max)

  const { winner } = values.reduce(
    ({ sum, winner }, current, index) => {
      if (winner >= 0) {
        return { sum, winner }
      }
      if (sum + current >= winnerValue) {
        return { sum, winner: index }
      }
      return { sum: sum + current, winner }
    },
    { sum: 0, winner: -1 }
  )

  return winner
}

export const useSpinner = (games: { player: Player; name: string }[]) => {
  const handicap = useSpinnerHandicap()

  const [current, setCurrent] = useState<number | null>(null)
  const [transition, setTransition] = useState<number | null>(null)
  const [winner, setWinner] = useState<number | null>(null)
  const max = games.length

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const rotate = useCallback(
    (prev = current, winner = getWinner(games, handicap), speed = -100) => {
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
    [current, games, handicap, max]
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

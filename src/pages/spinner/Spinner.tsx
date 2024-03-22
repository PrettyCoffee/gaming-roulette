import { useEffect, useRef } from "react"

import { create as createConfetti } from "canvas-confetti"
import { Dices } from "lucide-react"

import victorySound from "~/assets/victory.mp3"
import { Icon } from "~/components/Icon"
import { NoData } from "~/components/NoData"
import { Button } from "~/components/ui/button"
import { audioSettingsAtom } from "~/data/audioSettings"
import { useGames } from "~/data/games"
import { Player, usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { resetIdle } from "~/hooks/useIdle"
import { shuffle } from "~/utils/array"
import { color200 } from "~/utils/colors"
import { today } from "~/utils/date"
import { playAudio } from "~/utils/playAudio"

import { ClassicWheel } from "./ClassicWheel"
import { HalfWheel } from "./HalfWheel"
import { Tags } from "./Tags"
import { useNumberRotation } from "./useNumberRotation"
import { Wheel } from "./Wheel"

const playVictory = () =>
  playAudio(victorySound, {
    volume: audioSettingsAtom.get().victoryVolume,
  })

const popConfetti = (canvas: HTMLCanvasElement, color?: string) => {
  const confetti = createConfetti(canvas, { resize: true })
  const playerColor = color200[color ?? ""]
  const settings = {
    particleCount: 100,
    spread: 75,
    colors: playerColor ? [playerColor] : Object.values(color200),
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

const getSpinnerGames = (players: Player[]) =>
  players
    .flatMap(player => player.games.map(game => ({ player, name: game })))
    .filter(Boolean)

const useSpinnerGames = () => {
  const { players } = usePlayers()
  // Only compute on the first render, to prevent changes on the game list
  const { current } = useRef(shuffle(getSpinnerGames(players)))
  return current
}

export interface SpinnerItem {
  name: string
  player: Player
}

export interface SpinnerStateProps {
  items: SpinnerItem[]
  current?: number
  winner?: number
  transitionDuration: number
}

export const Spinner = () => {
  const [settings] = useSettings()
  const { setPlayers } = usePlayers()
  const { addGame } = useGames()

  const items = useSpinnerGames()

  const { current, rotate, reset, winner, transition } = useNumberRotation(
    items.length
  )

  useEffect(() => {
    const game = winner != null && items[winner]
    if (!game) return

    addGame({
      playerId: game.player.id,
      name: game.name,
      date: today(),
    })

    setPlayers(players =>
      players.map(player => ({
        ...player,
        games: player.games.filter(g => g !== game.name),
      }))
    )
  }, [addGame, items, setPlayers, winner])

  const canvas = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvas.current || winner == null) return
    playVictory()
    popConfetti(canvas.current, items[winner]?.player.color)
  }, [items, winner])

  if (items.length === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <NoData
          label={"You must add some games first before you can spin the wheel."}
        />
      </div>
    )

  const props: SpinnerStateProps = {
    items,
    current: current ?? undefined,
    winner: winner ?? undefined,
    transitionDuration: transition ?? 0,
  }

  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center gap-2">
      {settings.pickerView === "wheel" ? (
        <Wheel {...props} />
      ) : settings.pickerView === "classic-wheel" ? (
        <ClassicWheel {...props} />
      ) : settings.pickerView === "half-wheel" ? (
        <div className="h-56 w-full">
          <HalfWheel {...props} />
        </div>
      ) : (
        <Tags {...props} />
      )}
      <canvas
        className="pointer-events-none absolute -inset-4 h-[calc(100%+theme(height.4)*2)]  w-[calc(100%+theme(width.4)*2)]"
        ref={canvas}
      />
      <Button
        variant="flat"
        className="w-1/2"
        onClick={() => {
          reset()
          rotate()
        }}
      >
        <Icon icon={Dices} />
        Spin
      </Button>
    </div>
  )
}

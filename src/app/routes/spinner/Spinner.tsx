import { useEffect, useRef } from "react"

import { create as createConfetti } from "canvas-confetti"
import { Dices } from "lucide-react"

import victorySound from "assets/victory.mp3"
import { Button } from "components/buttons/Button"
import { NoData } from "components/feedback/NoData"
import { toast } from "components/feedback/Toaster"
import { Icon } from "components/primitives/Icon"
import { audioSettingsAtom } from "data/audioSettings"
import { useGames } from "data/games"
import { Player, usePlayers } from "data/players"
import { useSettings } from "data/settings"
import {
  ClassicWheel,
  HalfWheel,
  Tags,
  Wheel,
  SpinnerStateProps,
} from "features/spinners"
import { resetIdle } from "hooks/useIdle"
import { shuffle } from "utils/array"
import { color200 } from "utils/colors"
import { today } from "utils/date"
import { playAudio } from "utils/playAudio"

import { useSpinner } from "./useSpinner"

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
  const { current } = useRef(shuffle(getSpinnerGames(players)).slice(0, 30))
  return current
}

const Spinner = () => {
  const [settings] = useSettings()
  const { setPlayers, setPlayerAttribute } = usePlayers()
  const { addGame, removeGame } = useGames()

  const items = useSpinnerGames()

  const { current, rotate, reset, winner, transition } = useSpinner(items)

  useEffect(() => {
    const game = winner != null && items[winner]
    if (!game) return

    const id = addGame({
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

    toast({
      kind: "success",
      message: "Added to games",
      undo: () => {
        removeGame(id)
        setPlayerAttribute(game.player.id, "games", game.player.games)
        toast({ kind: "info", message: "Reverted action" })
      },
    })
  }, [addGame, items, removeGame, setPlayerAttribute, setPlayers, winner])

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
        <div className="aspect-video max-h-80 w-3/4">
          <Wheel {...props} />
        </div>
      ) : settings.pickerView === "classic-wheel" ? (
        <div className="aspect-square max-h-[min(90%,24rem)] w-full">
          <ClassicWheel {...props} />
        </div>
      ) : settings.pickerView === "half-wheel" ? (
        <div className="aspect-video max-h-[min(75%,18rem)] w-3/4">
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

export default Spinner

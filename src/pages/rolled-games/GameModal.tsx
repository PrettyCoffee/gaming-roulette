import { Dispatch, useId, useState } from "react"

import { DateInput } from "~/components/DateInput"
import { InputLabel } from "~/components/InputLabel"
import { Modal } from "~/components/Modal"
import { Select } from "~/components/Select"
import { Input } from "~/components/ui/input"
import { Game } from "~/data/games"
import { usePlayers } from "~/data/players"
import { cn } from "~/utils/utils"

const Swatch = ({ color }: { color: string }) => (
  <span
    className={cn(
      "mr-1 inline-block size-4 rounded-sm border border-base/50",
      `bg-${color}-200`
    )}
  />
)

const getIsoDate = () => new Date().toISOString().split("T")[0] ?? ""

interface GameModalProps {
  initialValue?: Partial<Game>
  onConfirm: Dispatch<Partial<Game>>
  onCancel: () => void
  title: string
  description: string
}

export const GameModal = ({
  initialValue = {},
  onConfirm,
  onCancel,
  ...rest
}: GameModalProps) => {
  const id = useId()
  const nameId = `${id}-name`
  const dateId = `${id}-date`
  const playerId = `${id}-player`
  const [game, setGame] = useState(initialValue)
  const { players } = usePlayers()

  const set = <Key extends keyof Game>(key: Key, value: Game[Key]) =>
    setGame(prev => ({ ...prev, [key]: value }))

  const saveDisabled =
    !game.name ||
    (game.name === initialValue.name &&
      game.date === initialValue.date &&
      game.player?.id === initialValue.player?.id)

  return (
    <Modal
      open
      confirm={{
        label: "Save",
        onClick: () => onConfirm(game),
        disabled: saveDisabled,
      }}
      cancel={{ label: "Cancel", onClick: onCancel }}
      {...rest}
    >
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <InputLabel htmlFor={nameId}>Name</InputLabel>
          <Input
            id={nameId}
            value={game.name}
            placeholder="Cassette beasts"
            onChange={({ target }) => set("name", target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor={dateId}>Added</InputLabel>
          <DateInput
            id={dateId}
            value={game.date ?? getIsoDate()}
            onChange={value => set("date", value)}
          />
        </div>
        <div className="w-36">
          <InputLabel htmlFor={playerId}>Player</InputLabel>
          <Select
            id={playerId}
            placeholder="Select player"
            value={game.player?.id ?? ""}
            onChange={value =>
              set(
                "player",
                players.find(({ id }) => id === value)
              )
            }
            options={players.map(({ id, name, color }) => ({
              value: id,
              label: (
                <div className="flex items-center">
                  <Swatch color={color} />
                  <span className="truncate">{name}</span>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </Modal>
  )
}

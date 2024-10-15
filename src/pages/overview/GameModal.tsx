import { Dispatch, useId, useState } from "react"

import { Text } from "~/components/base/Text"
import { DateInput } from "~/components/inputs/DateInput"
import { Input } from "~/components/inputs/Input"
import { InputLabel } from "~/components/inputs/InputLabel"
import { NumberInput } from "~/components/inputs/NumberInput"
import { Select } from "~/components/inputs/Select"
import { Modal } from "~/components/Modal"
import { Swatch } from "~/components/Swatch"
import { Game, PlayerStats } from "~/data/games"
import { Player, usePlayers } from "~/data/players"
import { borderColor, ColorValue, textColor } from "~/utils/colors"
import { today } from "~/utils/date"
import { cn } from "~/utils/utils"

export const unknownPlayer: Player = {
  id: "unknown",
  name: "Unknown",
  color: "neutral",
  games: [],
}

interface StatsInputProps {
  stats: Partial<PlayerStats>
  onChange: Dispatch<PlayerStats>
  color: ColorValue
  player: string
}
const StatsInput = ({ stats, onChange, color, player }: StatsInputProps) => {
  const id = useId()
  const { playtime, rating } = stats

  return (
    <div
      className={cn(
        "relative flex gap-4 rounded p-3 pb-2",
        borderColor({ color })
      )}
    >
      <Text
        color="muted"
        size="xs"
        className={cn(
          "absolute left-2 top-0 -translate-y-1/2 bg-background px-1",
          textColor({ color })
        )}
      >
        {player}
      </Text>
      <div>
        <InputLabel htmlFor={id} className="mb-0">
          Time
        </InputLabel>
        <NumberInput
          placeholder="-"
          value={playtime}
          onChange={value => onChange({ rating, playtime: value })}
          unit="h"
          min={0}
          max={999}
        />
      </div>
      <div>
        <InputLabel htmlFor={id} className="mb-0">
          Rating
        </InputLabel>
        <NumberInput
          placeholder="-"
          value={rating}
          onChange={value => onChange({ playtime, rating: value })}
          unit="/ 10"
          min={0}
          max={10}
        />
      </div>
    </div>
  )
}

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

  const playerOptions = [unknownPlayer, ...players]

  const set = <Key extends keyof Game>(key: Key, value: Game[Key]) =>
    setGame(prev => ({ ...prev, [key]: value }))

  const saveDisabled =
    !game.name || JSON.stringify(game) === JSON.stringify(initialValue)

  return (
    <Modal
      className={cn(players.length > 2 && "max-w-xl")}
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
            value={game.date ?? today()}
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
                playerOptions.find(({ id }) => id === value)
              )
            }
            options={playerOptions.map(({ id, name, color }) => ({
              value: id,
              label: (
                <div className="flex items-center gap-1">
                  <Swatch color={color} size={"sm"} />
                  <span className="truncate">{name}</span>
                </div>
              ),
            }))}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 pt-4">
        {players.map(({ id, color, name }) => (
          <StatsInput
            key={id}
            stats={game.stats?.[id] ?? {}}
            color={color}
            player={name}
            onChange={stats => {
              const newStats = { ...game.stats, [id]: stats }
              if (!stats.playtime || !stats.rating) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete newStats[id]
              }
              set("stats", { ...game.stats, [id]: stats })
            }}
          />
        ))}
      </div>
    </Modal>
  )
}

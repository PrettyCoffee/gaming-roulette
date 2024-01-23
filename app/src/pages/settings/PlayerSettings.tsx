import { Dispatch, useState } from "react"

import { Plus, Trash } from "lucide-react"

import { ColorPicker } from "~/components/ColorPicker"
import { IconButton, IconButtonProps } from "~/components/IconButton"
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { Player, usePlayers } from "~/data/players"
import { colors } from "~/utils/colors"

interface PlayerInputProps {
  id: string
  label: string
  name: string
  color: string
  onNameChange: Dispatch<string>
  onColorChange: Dispatch<string>
  action: Omit<IconButtonProps, "outline">
}

const PlayerInput = ({
  id,
  label,
  name,
  color,
  onNameChange,
  onColorChange,
  action,
}: PlayerInputProps) => (
  <>
    <InputLabel className="mb-2" htmlFor={id}>
      {label}
    </InputLabel>
    <div className="flex gap-2">
      <Input
        id={id}
        value={name}
        onChange={({ target }) => onNameChange(target.value)}
        placeholder="Name"
      />
      <ColorPicker
        value={color}
        colors={colors}
        onChange={color => onColorChange(color)}
      />
      <IconButton variant="outline" {...action} />
    </div>
  </>
)

const AddPlayer = () => {
  const { addPlayer } = usePlayers()

  const [name, setName] = useState("")
  const [color, setColor] = useState("")

  const disabled = name === "" || color === ""

  const handleAdd = () => {
    addPlayer(name, color)
    setName("")
    setColor("")
  }

  return (
    <PlayerInput
      id="add-player"
      label="Add Player"
      name={name}
      color={color}
      onNameChange={setName}
      onColorChange={setColor}
      action={{
        icon: Plus,
        onClick: handleAdd,
        title: "Add player",
        disabled,
      }}
    />
  )
}

const EditPlayer = ({ id, name, color, index }: Player & { index: number }) => {
  const { setPlayerAttribute, removePlayer } = usePlayers()

  const setName = (name: string) => setPlayerAttribute(id, "name", name)
  const setColor = (color: string) => setPlayerAttribute(id, "color", color)
  const remove = () => removePlayer(id)

  return (
    <PlayerInput
      id={id}
      label={`Player #${index + 1}`}
      name={name}
      color={color}
      onNameChange={setName}
      onColorChange={setColor}
      action={{
        icon: Trash,
        onClick: remove,
        title: "Remove player",
      }}
    />
  )
}

export const PlayerSettings = () => {
  const { players } = usePlayers()
  return (
    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
      {players.map((player, index) => (
        <div key={player.id} className="col-span-1">
          <EditPlayer {...player} index={index} />
        </div>
      ))}
      <div className="col-span-1">
        <AddPlayer />
      </div>
    </div>
  )
}

import { Dispatch, useState } from "react"

import { Plus, Trash } from "lucide-react"

import { IconButton, IconButtonProps } from "components/buttons/IconButton"
import { ColorPicker } from "components/inputs/ColorPicker"
import { Input } from "components/inputs/Input"
import { InputLabel } from "components/inputs/InputLabel"
import { Modal } from "components/overlays/Modal"
import { Player, usePlayers } from "data/players"
import { ColorValue, colors, textColor } from "utils/colors"
import { cn } from "utils/utils"

import { Grid } from "./Grid"

interface PlayerInputProps {
  id: string
  label: string
  name: string
  color: ColorValue
  onNameChange: Dispatch<string>
  onColorChange: Dispatch<ColorValue>
  action: Omit<IconButtonProps, "outline">
  onKeyDown?: (key: string) => void
  onBlur?: (key: string) => void
}

const PlayerInput = ({
  id,
  label,
  name,
  color,
  onNameChange,
  onColorChange,
  action,
  onKeyDown,
  onBlur,
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
        onKeyDown={({ key }) => onKeyDown?.(key)}
        onBlur={() => onBlur?.(name)}
      />
      <ColorPicker
        value={color}
        colors={colors}
        onChange={color => onColorChange(color)}
      />
      <IconButton variant="ghost" {...action} />
    </div>
  </>
)

const AddPlayer = () => {
  const { addPlayer } = usePlayers()

  const [name, setName] = useState("")
  const [color, setColor] = useState<ColorValue>("red")

  const disabled = name === ""

  const handleAdd = () => {
    addPlayer(name, color)
    setName("")
    setColor("red")
  }

  return (
    <PlayerInput
      id="add-player"
      label="Add Player"
      name={name}
      color={color}
      onNameChange={setName}
      onColorChange={setColor}
      onBlur={() => name && handleAdd()}
      onKeyDown={key => key === "Enter" && handleAdd()}
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
  const setColor = (color: ColorValue) => setPlayerAttribute(id, "color", color)
  const remove = () => removePlayer(id)

  const [deleting, setDeleting] = useState(false)

  return (
    <>
      <PlayerInput
        id={id}
        label={`Player #${index + 1}`}
        name={name}
        color={color}
        onNameChange={setName}
        onColorChange={setColor}
        action={{
          icon: Trash,
          onClick: () => setDeleting(true),
          title: "Remove player",
        }}
      />
      <Modal
        open={deleting}
        title="Remove player"
        description={
          <>
            {"Do you really want to remove "}
            <b className={cn("opacity-75", textColor({ color }))}>{name}</b>
            {" from the player list?"}
          </>
        }
        cancel={{ label: "Cancel", onClick: () => setDeleting(false) }}
        confirm={{ label: "Remove", onClick: remove, variant: "destructive" }}
      />
    </>
  )
}

export const PlayerSettings = () => {
  const { players } = usePlayers()
  return (
    <Grid.Root>
      {players.map((player, index) => (
        <Grid.Item key={player.id}>
          <EditPlayer {...player} index={index} />
        </Grid.Item>
      ))}
      <Grid.Item>
        <AddPlayer />
      </Grid.Item>
    </Grid.Root>
  )
}

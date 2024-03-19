import { Dispatch, useState } from "react"

import { Plus, Trash } from "lucide-react"

import { ColorPicker } from "~/components/ColorPicker"
import { IconButton, IconButtonProps } from "~/components/IconButton"
import { InputLabel } from "~/components/InputLabel"
import { Modal } from "~/components/Modal"
import { Input } from "~/components/ui/input"
import { Player, usePlayers } from "~/data/players"
import { colors } from "~/utils/colors"

import { Grid } from "./Grid"

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
            <b className={`text-${color}-200 opacity-75`}>{name}</b>
            {" from the player list?"}
          </>
        }
        cancel={{ label: "Cancel", onClick: () => setDeleting(false) }}
        confirm={{ label: "Remove", onClick: remove }}
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

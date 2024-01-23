// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import { useState } from "react"

import { Plus, Trash } from "lucide-react"

import { ColorPicker } from "~/components/ColorPicker"
import { IconButton } from "~/components/IconButton"
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { Player, usePlayers } from "~/data/players"
import { colors } from "~/utils/colors"

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
    <>
      <InputLabel className="mb-2" htmlFor={"add-player"}>
        Add Player
      </InputLabel>
      <div className="flex gap-2">
        <Input
          id={"add-player"}
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Name"
        />
        <ColorPicker
          value={color}
          onChange={color => setColor(color)}
          colors={colors}
        />
        <IconButton
          variant="outline"
          onClick={handleAdd}
          icon={Plus}
          title="Add player"
          disabled={disabled}
        />
      </div>
    </>
  )
}

const EditPlayer = ({ id, name, color, index }: Player & { index: number }) => {
  const { setPlayerAttribute, removePlayer } = usePlayers()
  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        {`Player #${index + 1}`}
      </InputLabel>
      <div className="flex gap-2">
        <Input
          id={id}
          value={name}
          onChange={({ target }) =>
            setPlayerAttribute(id, "name", target.value)
          }
        />
        <ColorPicker
          value={color}
          onChange={color => setPlayerAttribute(id, "color", color)}
          colors={colors}
        />
        <IconButton
          variant="outline"
          onClick={() => removePlayer(id)}
          icon={Trash}
          title="Remove player"
        />
      </div>
    </>
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

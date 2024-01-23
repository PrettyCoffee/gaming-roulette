// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import { ColorPicker } from "~/components/ColorPicker"
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { usePlayers } from "~/data/players"
import { colors } from "~/utils/colors"

export const PlayerSettings = () => {
  const { players, setPlayerAttribute } = usePlayers()
  return (
    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
      {players.map(({ id, name, color }, index) => (
        <div key={id} className="col-span-1">
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
          </div>
        </div>
      ))}
    </div>
  )
}

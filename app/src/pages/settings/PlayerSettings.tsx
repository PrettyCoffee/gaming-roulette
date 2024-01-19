// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { usePlayers } from "~/data/players"

export const PlayerSettings = () => {
  const { players, setPlayerAttribute } = usePlayers()
  return (
    <div className="grid grid-cols-2 gap-2 p-2 pt-0">
      {players.map(({ id, name }, index) => (
        <div key={id} className="col-span-1">
          <InputLabel className="mb-2" htmlFor={id}>
            {`Player #${index + 1}`}
          </InputLabel>
          <Input
            id={id}
            value={name}
            onChange={({ target }) =>
              setPlayerAttribute(id, "name", target.value)
            }
          />
        </div>
      ))}
    </div>
  )
}

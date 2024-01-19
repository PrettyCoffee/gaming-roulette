import { InputLabel } from "~/components/InputLabel"
import { Textarea } from "~/components/ui/textarea"
import { usePlayers } from "~/data/players"
import { cn } from "~/utils/utils"

export const Current = () => {
  const { players, setPlayerAttribute } = usePlayers()

  return (
    <div className="flex flex-wrap gap-2 -mt-2">
      {players.map(({ id, color, name, games }) => (
        <div key={id} className="flex-1">
          <InputLabel htmlFor={id}>{name}</InputLabel>
          <Textarea
            id={id}
            className={cn(
              "h-56 whitespace-pre resize-none",
              `border-${color}-200`
            )}
            value={games.join("\n")}
            onChange={({ target }) =>
              setPlayerAttribute(
                id,
                "games",
                target.value.split("\n").slice(0, 10)
              )
            }
          />
        </div>
      ))}
    </div>
  )
}

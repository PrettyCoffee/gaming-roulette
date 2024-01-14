import { InputLabel } from "~/components/InputLabel"
import { Textarea } from "~/components/ui/textarea"
import { usePlayers } from "~/data/players"

export const Current = () => {
  const { players, setPlayerAttribute } = usePlayers()

  const { player1, player2 } = players
  const games1 = player1.games
  const games2 = player2.games

  return (
    <div className="flex gap-2 -mt-2">
      <div className="flex-1">
        <InputLabel htmlFor="player-1">{player1.name}</InputLabel>
        <Textarea
          className="h-56 border-red-200 whitespace-pre resize-none"
          id="player-1"
          value={games1.join("\n")}
          onChange={({ target }) =>
            setPlayerAttribute("player1", "games", target.value.split("\n"))
          }
        />
      </div>
      <div className="flex-1">
        <InputLabel htmlFor="player-2">{player2.name}</InputLabel>

        <Textarea
          className="h-56 border-blue-200 whitespace-pre resize-none"
          id="player-2"
          value={games2.join("\n")}
          onChange={({ target }) =>
            setPlayerAttribute("player2", "games", target.value.split("\n"))
          }
        />
      </div>
    </div>
  )
}

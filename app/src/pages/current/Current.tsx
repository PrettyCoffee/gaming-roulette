import { Dispatch, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Textarea } from "~/components/ui/textarea"
import { Player, usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { cn } from "~/utils/utils"

const Counter = ({ current, limit }: { limit: number; current: number }) => (
  <span
    className={cn(
      "text-sm font-bold text-muted-foreground",
      current > limit && "text-red-400"
    )}
  >
    {current} / {limit}
  </span>
)

interface PlayerGamesProps extends Player {
  onChange: Dispatch<string[]>
}

const PlayerGames = ({
  id,
  color,
  games,
  name,
  onChange,
}: PlayerGamesProps) => {
  const [{ gamesPerPerson }] = useSettings()
  const [value, setValue] = useState(games.join("\n"))

  const amountOfGames = games.filter(Boolean).length

  const setGames = (games: string) => {
    setValue(games)
    onChange(games.split("\n"))
  }

  return (
    <div key={id} className="flex-1">
      <div className="flex justify-between px-3">
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Counter current={amountOfGames} limit={gamesPerPerson} />
      </div>
      <Textarea
        id={id}
        className={cn(
          "h-56 whitespace-pre resize-none",
          `border-${color}-200`,
          amountOfGames > gamesPerPerson && `border-red-500`
        )}
        value={value}
        onChange={({ target }) => setGames(target.value)}
      />
    </div>
  )
}

export const Current = () => {
  const { players, setPlayerAttribute } = usePlayers()

  return (
    <div className="flex flex-wrap gap-2 -mt-2">
      {players.map(player => (
        <PlayerGames
          key={player.id}
          {...player}
          onChange={games => setPlayerAttribute(player.id, "games", games)}
        />
      ))}
    </div>
  )
}

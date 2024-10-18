import { Dispatch, useMemo, useState } from "react"

import { AlertTriangle, ChevronsDown } from "lucide-react"

import { Tooltip } from "~/components/feedback/Tooltip"
import { InputLabel } from "~/components/inputs/InputLabel"
import { Textarea } from "~/components/inputs/Textarea"
import { Icon } from "~/components/primitives/Icon"
import { Text } from "~/components/primitives/Text"
import { useHandicap } from "~/data/handicap"
import { Player, usePlayerGameStats, usePlayers } from "~/data/players"
import { useRuleset } from "~/data/ruleset"
import { borderColor } from "~/utils/colors"
import { cn } from "~/utils/utils"

const Counter = ({ current, limit }: { limit: number; current: number }) => (
  <span
    className={cn(
      "mb-1 ml-2 text-nowrap text-sm font-bold text-muted-foreground",
      current > limit && "text-red-400"
    )}
  >
    {current} / {limit}
  </span>
)

interface PlayerGamesProps extends Player {
  onChange: Dispatch<string[]>
}

const ErrorHint = ({ errors }: { errors: string[] }) => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <span className="mb-1 inline-flex">
        <Icon icon={AlertTriangle} color="error" size="sm" />
      </span>
    </Tooltip.Trigger>
    <Tooltip.Content
      className="border-red-500"
      side="bottom"
      align="end"
      alignOffset={-8}
      sideOffset={10}
    >
      <ul>
        {errors.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Tooltip.Content>
  </Tooltip.Root>
)

const Handicap = ({ id }: { id: string }) => {
  const handicap = useHandicap()
  const isPlayer = handicap.playerId === id
  if (!isPlayer || handicap.amount < 0.01) return null

  const percentage = (handicap.amount * 100).toFixed(0)

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Text className="whitespace-nowrap text-red-300" size="xs">
          <Icon icon={ChevronsDown} size="xs" color="current" />
          {` -${percentage}%`}
        </Text>
      </Tooltip.Trigger>

      <Tooltip.Content side="bottom" align="center" sideOffset={10}>
        Player has a handicap of {percentage}%<br />
        due to {handicap.wins} successive wins.
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

const PlayerGames = ({
  id,
  color,
  games,
  name,
  onChange,
}: PlayerGamesProps) => {
  const [rules] = useRuleset()
  const stats = usePlayerGameStats()[id]
  const [value, setValue] = useState(games.join("\n"))

  const amountOfGames = games.length

  const errors = useMemo(() => {
    const errors: string[] = []
    if (rules.gamesPerPerson < amountOfGames) {
      errors.push("Too many games")
    }
    if (!rules.allowDuplicates && stats?.hasDuplicates) {
      errors.push("Duplicates are not allowed")
    }
    if (!rules.allowCrossDuplicates && stats?.hasCrossDuplicates) {
      errors.push("Cross duplicates are not allowed")
    }
    return errors
  }, [amountOfGames, rules, stats])

  const setGames = (games: string) => {
    setValue(games)
    onChange(
      games
        .split("\n")
        .filter(Boolean)
        .map(game => game.slice(0, 50).trim())
    )
  }

  return (
    <div key={id} className="col-span-1">
      <div className="flex items-center gap-2 px-3">
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <div className="mb-1 inline-flex flex-1 items-center">
          <Handicap id={id} />
        </div>
        <Counter current={amountOfGames} limit={rules.gamesPerPerson} />
        {errors.length > 0 && <ErrorHint errors={errors} />}
      </div>
      <Textarea
        id={id}
        value={value}
        onChange={({ target }) => setGames(target.value)}
        lines={Math.min(rules.gamesPerPerson, 10)}
        className={cn(
          "resize-none whitespace-pre",
          borderColor({ color }),
          errors.length > 0 && `border-red-500`
        )}
      />
    </div>
  )
}

const Current = () => {
  const { players, setPlayerAttribute } = usePlayers()

  return (
    <div
      className={cn(
        "-mt-2 grid h-full min-w-[75%] grid-cols-2 gap-2",
        players.length > 2 && "md:grid-cols-3",
        players.length > 3 && "lg:grid-cols-4"
      )}
    >
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

export default Current

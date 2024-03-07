import { Dispatch, useMemo, useState } from "react"

import { AlertTriangle } from "lucide-react"

import { Icon } from "~/components/Icon"
import { InputLabel } from "~/components/InputLabel"
import { Textarea } from "~/components/ui/textarea"
import { Tooltip } from "~/components/ui/tooltip"
import { Player, usePlayerGameStats, usePlayers } from "~/data/players"
import { useRuleset } from "~/data/ruleset"
import { getFontSize } from "~/utils/getFontSize"
import { cn } from "~/utils/utils"

const Counter = ({ current, limit }: { limit: number; current: number }) => (
  <span
    className={cn(
      "text-sm font-bold text-muted-foreground text-nowrap ml-2",
      current > limit && "text-red-400"
    )}
  >
    {current} / {limit}
  </span>
)

interface PlayerGamesProps extends Player {
  onChange: Dispatch<string[]>
}

const getLineHeight = (element: HTMLElement): number => {
  const rem = getFontSize()
  const fontSize = getFontSize(element)
  const lineHeight = getComputedStyle(element).lineHeight

  const value = lineHeight.match(/(\d+\.?\d*)/)?.[1]
  const unit = lineHeight.replace(value ?? "", "")

  const fallback = fontSize * 1.3 // some random fallback with no meaning
  if (value == null) return fallback

  switch (unit) {
    case "px":
      return parseFloat(value)
    case "rem":
      return parseFloat(value) * rem
    case "em":
    case "":
      return parseFloat(value) * fontSize
    default:
      return fallback
  }
}

const getYPadding = (element: HTMLElement) => {
  const { paddingTop, paddingBottom } = getComputedStyle(element)
  return parseFloat(paddingTop) + parseFloat(paddingBottom)
}

const getYBorder = (element: HTMLElement) => {
  const { borderTopWidth, borderBottomWidth } = getComputedStyle(element)
  return parseFloat(borderTopWidth) + parseFloat(borderBottomWidth)
}

const ErrorHint = ({ errors }: { errors: string[] }) => (
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div>
        <Icon icon={AlertTriangle} color="error" size="sm" />
      </div>
    </Tooltip.Trigger>
    <Tooltip.Content
      className="border-red-500"
      side="bottom"
      align="end"
      alignOffset={-8}
    >
      <ul>
        {errors.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Tooltip.Content>
  </Tooltip.Root>
)

const PlayerGames = ({
  id,
  color,
  games,
  name,
  onChange,
}: PlayerGamesProps) => {
  const [ref, setRef] = useState<HTMLTextAreaElement | null>(null)
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
    onChange(games.split("\n").filter(Boolean))
  }

  const height = useMemo(() => {
    if (ref == null) return "0px"
    const lineHeight = getLineHeight(ref)
    const padding = getYPadding(ref)
    const border = getYBorder(ref)
    const height =
      Math.min(rules.gamesPerPerson, 10) * lineHeight + padding + border
    return `${height}px`
  }, [rules.gamesPerPerson, ref])

  return (
    <div key={id} className="col-span-1">
      <div className="flex px-3 items-center gap-2">
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <div className="flex-1" />
        <Counter current={amountOfGames} limit={rules.gamesPerPerson} />
        {errors.length > 0 && <ErrorHint errors={errors} />}
      </div>
      <Textarea
        ref={setRef}
        id={id}
        value={value}
        onChange={({ target }) => setGames(target.value)}
        style={{ height }}
        className={cn(
          "whitespace-pre resize-none",
          `border-${color}-200`,
          errors.length > 0 && `border-red-500`
        )}
      />
    </div>
  )
}

export const Current = () => {
  const { players, setPlayerAttribute } = usePlayers()

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 -mt-2",
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

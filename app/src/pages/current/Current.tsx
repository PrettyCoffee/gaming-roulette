import { Dispatch, useMemo, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Textarea } from "~/components/ui/textarea"
import { Player, usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
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

const PlayerGames = ({
  id,
  color,
  games,
  name,
  onChange,
}: PlayerGamesProps) => {
  const [ref, setRef] = useState<HTMLTextAreaElement | null>(null)
  const [{ gamesPerPerson }] = useSettings()
  const [value, setValue] = useState(games.join("\n"))

  const amountOfGames = games.filter(Boolean).length

  const setGames = (games: string) => {
    setValue(games)
    onChange(games.split("\n").filter(Boolean))
  }

  const height = useMemo(() => {
    if (ref == null) return "0px"
    const lineHeight = getLineHeight(ref)
    const padding = getYPadding(ref)
    const border = getYBorder(ref)
    const height = Math.min(gamesPerPerson, 10) * lineHeight + padding + border
    return `${height}px`
  }, [gamesPerPerson, ref])

  return (
    <div key={id} className="flex-1">
      <div className="flex justify-between px-3">
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Counter current={amountOfGames} limit={gamesPerPerson} />
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
          amountOfGames > gamesPerPerson && `border-red-500`
        )}
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

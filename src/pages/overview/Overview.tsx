import { useCallback, useEffect, useRef, useState } from "react"

import { RefreshCw, Star } from "lucide-react"

import { Icon } from "~/components/Icon"
import { LoadingData } from "~/components/LoadingData"
import { Button } from "~/components/ui/button"
import { Table } from "~/components/ui/table"
import { GameStats, UserStats, useGames } from "~/data/games"
import { usePlayers } from "~/data/players"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

const averageStat = (
  games: GameStats[],
  user: keyof Omit<GameStats, "name" | "date">,
  stat: keyof UserStats
) => {
  const validGames = games.filter(game => typeof game[user][stat] === "number")
  return (
    validGames.reduce((acc, game) => acc + (game[user][stat] ?? 0), 0) /
    validGames.length
  )
}

const averageStats = (games: GameStats[]) => ({
  online: {
    playtime: averageStat(games, "online", "playtime"),
    rating: averageStat(games, "online", "rating"),
  },
  player1: {
    playtime: averageStat(games, "player1", "playtime"),
    rating: averageStat(games, "player1", "rating"),
  },
  player2: {
    playtime: averageStat(games, "player2", "playtime"),
    rating: averageStat(games, "player2", "rating"),
  },
})

const formatNumber = (number?: number) =>
  number?.toFixed(1).replace(/\.0$/, "") ?? "-"

const Hours = ({ hours }: { hours?: number }) => (
  <span className="inline-flex whitespace-nowrap items-center gap-2">
    {formatNumber(hours)} <span className="text-muted-foreground">h</span>
  </span>
)

const Rating = ({ rating }: { rating?: number }) => (
  <span className={cn("inline-flex whitespace-nowrap items-center gap-2")}>
    {formatNumber(rating)}
    <Icon icon={Star} size="sm" className="text-yellow-200" />
  </span>
)

const GamesTable = ({ games }: { games: GameStats[] }) => {
  const { players } = usePlayers()
  const average = averageStats(games)

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row className="border-none">
          <Table.Head>Name</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head colSpan={2} className="text-center">
            Online
          </Table.Head>
          {players.map(player => (
            <Table.Head key={player.id} colSpan={2} className="text-center">
              {player.name}
            </Table.Head>
          ))}
        </Table.Row>

        {/*
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Clock} color="current" size="sm" />
          </Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Star} color="current" size="sm" />
          </Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Clock} color="current" size="sm" />
          </Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Star} color="current" size="sm" />
          </Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Clock} color="current" size="sm" />
          </Table.Head>
          <Table.Head className="text-center">
            <Icon icon={Star} color="current" size="sm" />
          </Table.Head>
        </Table.Row>
        */}
      </Table.Header>

      <Table.Body>
        {games.map(game => (
          <Table.Row key={game.name}>
            <Table.Cell>{game.name}</Table.Cell>
            <Table.Cell className={noOverflow}>{game.date}</Table.Cell>
            <Table.Cell className="text-end">
              <Hours hours={game.online.playtime} />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Rating rating={game.online.rating} />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Hours hours={game.player1.playtime} />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Rating rating={game.player1.rating} />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Hours hours={game.player2.playtime} />
            </Table.Cell>
            <Table.Cell className="text-end">
              <Rating rating={game.player2.rating} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Average</Table.Cell>
          <Table.Cell align="right">
            <Hours hours={average.online.playtime} />
          </Table.Cell>
          <Table.Cell align="right">
            <Rating rating={average.online.rating} />
          </Table.Cell>
          <Table.Cell align="right">
            <Hours hours={average.player1.playtime} />
          </Table.Cell>
          <Table.Cell align="right">
            <Rating rating={average.player1.rating} />
          </Table.Cell>
          <Table.Cell align="right">
            <Hours hours={average.player2.playtime} />
          </Table.Cell>
          <Table.Cell align="right">
            <Rating rating={average.player2.rating} />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  )
}

const useDelayValueChange = <T,>(value: T, delay = 500) => {
  const [blockedValue, setBlockedValue] = useState(value)
  const isBlocked = useRef(false)
  const latestValue = useRef(value)
  const timeout = useRef<NodeJS.Timeout>()

  const blockChanges = useCallback(() => {
    isBlocked.current = true
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      setBlockedValue(latestValue.current)
      isBlocked.current = false
    }, delay)
  }, [delay])

  useEffect(() => {
    if (value == null) {
      setBlockedValue(value)
      blockChanges()
      return
    }

    if (isBlocked.current) {
      latestValue.current = value
      return
    }

    setBlockedValue(value)
  }, [value, blockChanges])

  return blockedValue
}

export const Overview = () => {
  const { games, refreshGames } = useGames()

  const debouncedGames = useDelayValueChange(games, 2000)

  if (!debouncedGames)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingData label="Loading data..." />
      </div>
    )

  return (
    <div className="h-full flex flex-col gap-2 -mt-2 -mr-2">
      <div className="flex flex-col overflow-auto [&>*]:flex-1 [&>*]:h-full">
        <GamesTable games={debouncedGames} />
      </div>
      <div>
        <Button variant="ghost" className="gap-2" onClick={refreshGames}>
          <Icon icon={RefreshCw} size="sm" />
          Reload
        </Button>
      </div>
    </div>
  )
}

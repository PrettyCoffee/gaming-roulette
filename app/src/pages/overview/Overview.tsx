import { Clock, RefreshCw, Star } from "lucide-react"

import { Icon } from "~/components/Icon"
import { Button } from "~/components/ui/button"
import { Table } from "~/components/ui/table"
import { GameStats, UserStats, useGames } from "~/data/games"
import { usePlayers } from "~/data/players"
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

const Hours = ({ hours }: { hours?: number }) => (
  <span className="inline-flex whitespace-nowrap items-center gap-2">
    {hours?.toFixed(1) ?? "-"} <span className="text-muted-foreground">h</span>
  </span>
)

const Rating = ({ rating }: { rating?: number }) => (
  <span className={cn("inline-flex whitespace-nowrap items-center gap-2")}>
    {rating?.toFixed(1) ?? "-"}{" "}
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
          <Table.Head colSpan={2} className="text-center">
            Game info
          </Table.Head>
          <Table.Head colSpan={2} className="text-center">
            Online
          </Table.Head>
          <Table.Head colSpan={2} className="text-center">
            {players.player1.name}
          </Table.Head>
          <Table.Head colSpan={2} className="text-center">
            {players.player2.name}
          </Table.Head>
        </Table.Row>

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
      </Table.Header>

      <Table.Body>
        {games.map(game => (
          <Table.Row key={game.name}>
            <Table.Cell>{game.name}</Table.Cell>
            <Table.Cell>{game.date}</Table.Cell>
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

export const Overview = () => {
  const { games, refreshGames } = useGames()

  if (!games) return <span>Loading...</span>

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex flex-col overflow-auto [&>*]:flex-1 [&>*]:h-full">
        <GamesTable games={games} />
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

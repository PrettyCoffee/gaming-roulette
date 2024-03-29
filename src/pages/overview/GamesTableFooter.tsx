import { Fragment } from "react/jsx-runtime"

import { Swatch } from "~/components/Swatch"
import { Table } from "~/components/ui/table"
import { Game, useGamePlayerStats } from "~/data/games"
import { Player } from "~/data/players"

const round = (value: number) => Math.round(value * 10) / 10

const getGamesByPlayers = (games: Game[]) =>
  games.reduce<Record<string, { count: number; player: Player }>>(
    (result, game) => {
      const { player } = game
      if (!player) return result

      return {
        ...result,
        [player.id]: {
          player,
          count: (result[player.id]?.count ?? 0) + 1,
        },
      }
    },
    {}
  )

export const GamesTableFooter = ({ games }: { games: Game[] }) => {
  const playerStats = useGamePlayerStats()
  const gamesByPlayers = getGamesByPlayers(games)

  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>
          <div className="flex items-center gap-4">
            Count:
            {Object.values(gamesByPlayers).map(({ count, player }) => (
              <div key={player.id} className="inline-flex items-center gap-1">
                <Swatch color={player.color} size="sm" />
                {count}
              </div>
            ))}
          </div>
        </Table.Cell>
        {playerStats.map(({ id, averageRating, averageTime }) => (
          <Fragment key={id}>
            <Table.Cell>{round(averageTime)} h</Table.Cell>
            <Table.Cell>{round(averageRating)} / 10</Table.Cell>
          </Fragment>
        ))}
        <Table.Cell />
      </Table.Row>
    </Table.Footer>
  )
}

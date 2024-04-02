import { Fragment } from "react/jsx-runtime"

import { Swatch } from "~/components/Swatch"
import { TitleTooltip } from "~/components/TitleTooltip"
import { Table } from "~/components/ui/table"
import { Game, useGamePlayerStats } from "~/data/games"
import { ColorValue } from "~/utils/colors"

const round = (value: number) => Math.round(value * 10) / 10

const getGamesByPlayers = (games: Game[]) =>
  games.reduce<
    Record<
      string,
      { count: number; id: string; name: string; color: ColorValue }
    >
  >((result, game) => {
    const { player } = game
    const { id, color, name } = player ?? {
      id: "unknown",
      name: "Unknown",
      color: "neutral",
    }

    return {
      ...result,
      [id]: {
        id,
        color,
        name,
        count: (result[id]?.count ?? 0) + 1,
      },
    }
  }, {})

export const GamesTableFooter = ({ games }: { games: Game[] }) => {
  const playerStats = useGamePlayerStats()
  const gamesByPlayers = getGamesByPlayers(games)

  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>
          <div className="flex items-center gap-4">
            Count:
            {Object.values(gamesByPlayers).map(({ count, id, name, color }) => (
              <TitleTooltip key={id} title={name} asChild>
                <div key={id} className="inline-flex items-center gap-1">
                  <Swatch color={color} size="sm" />
                  {count}
                </div>
              </TitleTooltip>
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

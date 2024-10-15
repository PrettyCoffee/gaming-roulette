import { Table as TableInstance } from "@tanstack/react-table"
import { Fragment } from "react/jsx-runtime"

import { Swatch } from "~/components/primitives/Swatch"
import { TitleTooltip } from "~/components/TitleTooltip"
import { Table } from "~/components/ui/table"
import { Game, useGamePlayerStats } from "~/data/games"
import { ColorValue } from "~/utils/colors"

import { unknownPlayer } from "./GameModal"
import { actionsCellWidth } from "./TableActions"

const round = (value: number) => Math.round(value * 10) / 10

const getGamesByPlayers = (games: Game[]) =>
  games.reduce<
    Record<
      string,
      { count: number; id: string; name: string; color: ColorValue }
    >
  >((result, game) => {
    const { player } = game
    const { id, color, name } = player ?? unknownPlayer

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

export const GamesTableFooter = ({
  games,
  table,
}: {
  games: Game[]
  table: TableInstance<Game>
}) => {
  const playerStats = useGamePlayerStats()
  const gamesByPlayers = getGamesByPlayers(games)

  if (table.isFiltering()) {
    return null
  }

  const columns = table.getAllLeafColumns()
  const countSize = columns
    .slice(0, 3)
    .reduce((acc, { getSize }) => acc + getSize(), 0)

  const timeColumn = columns[4]
  const ratingColumn = columns[5]

  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell style={{ width: `${countSize}rem`, flex: 1 }}>
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
            <Table.Cell
              style={{
                width: `${timeColumn?.getSize() ?? 0}rem`,
                textAlign: timeColumn?.columnDef.meta?.align,
              }}
            >
              {round(averageTime)} h
            </Table.Cell>
            <Table.Cell
              style={{
                width: `${ratingColumn?.getSize() ?? 0}rem`,
                textAlign: ratingColumn?.columnDef.meta?.align,
              }}
            >
              {round(averageRating)} / 10
            </Table.Cell>
          </Fragment>
        ))}
        <Table.Cell style={{ width: actionsCellWidth }} />
      </Table.Row>
    </Table.Footer>
  )
}

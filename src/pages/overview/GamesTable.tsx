import { Dispatch, useMemo } from "react"

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"

import { Text } from "~/components/base/Text"
import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"
import { usePlayers } from "~/data/players"
import { textColor } from "~/utils/colors"

import { FilterFeature } from "./FilterFeature"
import { GamesTableBody } from "./GamesTableBody"
import { GamesTableFooter } from "./GamesTableFooter"
import { GamesTableHeader } from "./GamesTableHeader"

const alphaSorting = (a = "", b = "") =>
  a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1

const columnHelper = createColumnHelper<Game>()

const gameColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    size: 15,
    sortingFn: "text",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    size: 6,
    minSize: 6,
    sortDescFirst: true,
  }),
  columnHelper.accessor("player", {
    header: "Player",
    size: 10,
    sortingFn: (a, b) =>
      alphaSorting(a.original.player?.name, b.original.player?.name),
    cell: ({ getValue }) => {
      const player = getValue()
      return !player ? (
        <span className="text-muted-foreground">Unknown</span>
      ) : (
        <span className={textColor({ color: player.color })}>
          {player.name}
        </span>
      )
    },
  }),
]

const playerColumns = (id: string) => [
  columnHelper.accessor("stats", {
    id: `player-stats-${id}-time`,
    header: "Time",
    sortingFn: ({ original: a }, { original: b }) => {
      const playtimeA = a.stats?.[id]?.playtime ?? 0
      const playtimeB = b.stats?.[id]?.playtime ?? 0
      return playtimeA - playtimeB
    },
    cell: ({ getValue }) => {
      const stats = getValue()?.[id]
      return <Text>{stats?.playtime ?? "-"} h</Text>
    },
  }),
  columnHelper.accessor("stats", {
    id: `player-stats-${id}-rating`,
    header: "Rating",
    sortingFn: ({ original: a }, { original: b }) => {
      const ratingA = a.stats?.[id]?.rating ?? 0
      const ratingB = b.stats?.[id]?.rating ?? 0
      return ratingA - ratingB
    },
    cell: ({ getValue }) => {
      const stats = getValue()?.[id]
      return <Text>{stats?.rating ?? "-"} / 10</Text>
    },
  }),
]

const useColumns = () => {
  const { players } = usePlayers()

  return useMemo(
    () => [
      columnHelper.group({
        header: "Game",
        columns: gameColumns,
      }),
      ...players.map(({ id, name, color }) =>
        columnHelper.group({
          id: `player-stats-${id}`,
          header: () => <span className={textColor({ color })}>{name}</span>,
          columns: playerColumns(id),
        })
      ),
    ],
    [players]
  )
}

interface GamesTableProps {
  data: Game[]
  onEdit: Dispatch<Game>
  onDelete: Dispatch<Game>
}

export const GamesTable = ({ data, onEdit, onDelete }: GamesTableProps) => {
  const columns = useColumns()

  const table = useReactTable<Game>({
    _features: [FilterFeature<Game>(["name", "date", "player.name"])],
    data,
    columns,
    defaultColumn: {
      size: 10,
      minSize: 5,
      sortDescFirst: false,
    },
    initialState: {
      sorting: [{ id: "date", desc: true }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <NativeTable.Root>
      <GamesTableHeader table={table} />
      <GamesTableBody table={table} onEdit={onEdit} onDelete={onDelete} />
      <GamesTableFooter table={table} games={data} />
    </NativeTable.Root>
  )
}

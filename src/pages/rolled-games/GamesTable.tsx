import { Dispatch } from "react"

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"

import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"
import { textColor } from "~/utils/colors"

import { GamesTableBody } from "./GamesTableBody"
import { GamesTableFooter } from "./GamesTableFooter"
import { GamesTableHeader } from "./GamesTableHeader"

const alphaSorting = (a = "", b = "") =>
  a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1

const columnHelper = createColumnHelper<Game>()

const columns = [
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

interface GamesTableProps {
  data: Game[]
  onEdit: Dispatch<Game>
  onDelete: Dispatch<Game>
}

export const GamesTable = ({ data, onEdit, onDelete }: GamesTableProps) => {
  const table = useReactTable<Game>({
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
      <GamesTableFooter games={data} />
    </NativeTable.Root>
  )
}

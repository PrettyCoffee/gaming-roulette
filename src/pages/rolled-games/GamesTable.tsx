import { Dispatch } from "react"

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"
import { textColor } from "~/utils/colors"

import { GamesTableBody } from "./GamesTableBody"
import { GamesTableFooter } from "./GamesTableFooter"
import { GamesTableHeader } from "./GamesTableHeader"

const columnHelper = createColumnHelper<Game>()

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("date", {
    header: "Date",
  }),
  columnHelper.accessor("player", {
    header: "Player",
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
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <NativeTable.Root>
      <GamesTableHeader table={table} />
      <GamesTableBody table={table} onEdit={onEdit} onDelete={onDelete} />
      <GamesTableFooter games={data} />
    </NativeTable.Root>
  )
}

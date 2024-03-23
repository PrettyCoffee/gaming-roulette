import { Dispatch } from "react"

import { Cell, flexRender, Row, Table } from "@tanstack/react-table"
import { PenBox, Trash } from "lucide-react"

import { IconButton } from "~/components/IconButton"
import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"

interface TableActionsProps {
  row: Row<Game>
  onEdit: Dispatch<Game>
  onDelete: Dispatch<Game>
}
const TableActions = ({ row, onEdit, onDelete }: TableActionsProps) => (
  <NativeTable.Cell className="w-24 min-w-24 px-2 opacity-0 [tr:focus-within_&]:opacity-100 [tr:hover_&]:opacity-100">
    <IconButton
      icon={PenBox}
      title="Edit"
      onClick={() => onEdit(row.original)}
    />
    <IconButton
      icon={Trash}
      title="Delete"
      onClick={() => onDelete(row.original)}
    />
  </NativeTable.Cell>
)

const DataCell = ({ cell }: { cell: Cell<Game, unknown> }) => (
  <NativeTable.Cell key={cell.id}>
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </NativeTable.Cell>
)

interface GamesTableBodyProps {
  table: Table<Game>
  onEdit: (game: Game) => void
  onDelete: (game: Game) => void
}

export const GamesTableBody = ({
  table,
  onEdit,
  onDelete,
}: GamesTableBodyProps) => {
  return (
    <NativeTable.Body>
      {table.getRowModel().rows.map(row => (
        <NativeTable.Row key={row.id}>
          {row.getVisibleCells().map(cell => (
            <DataCell key={cell.id} cell={cell} />
          ))}

          <TableActions
            key={row.id}
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </NativeTable.Row>
      ))}
    </NativeTable.Body>
  )
}

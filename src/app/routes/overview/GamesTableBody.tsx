import { Dispatch, useRef } from "react"

import { Cell, flexRender, Row, Table } from "@tanstack/react-table"
import { PenBox, Trash } from "lucide-react"

import { IconButton } from "components/buttons/IconButton"
import { Table as NativeTable } from "components/Table"
import { Game } from "data/games"
import { useTransition } from "hooks/useTransition"
import { cn } from "utils/utils"

interface TableActionsProps {
  row: Row<Game>
  onEdit: Dispatch<Game>
  onDelete: Dispatch<Game>
}
const TableActions = ({ row, onEdit, onDelete }: TableActionsProps) => (
  <NativeTable.Cell
    className={cn(
      "sticky right-0 overflow-visible px-0 py-1 opacity-0 [tr:focus-within_&]:opacity-100 [tr:hover_&]:opacity-100"
    )}
  >
    <div className="ml-auto flex w-max items-center">
      <div className="inline-block h-10 w-2 shrink-0 bg-gradient-to-r from-transparent to-alt" />
      <div className="inline-flex justify-end bg-alt pr-1">
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
      </div>
    </div>
  </NativeTable.Cell>
)

const DataCell = ({ cell }: { cell: Cell<Game, unknown> }) => (
  <NativeTable.Cell
    key={cell.id}
    style={{
      width: `${cell.column.getSize()}rem`,
      textAlign: cell.column.columnDef.meta?.align,
      flex: cell.column.columnDef.meta?.flex ? "1" : undefined,
    }}
  >
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </NativeTable.Cell>
)

interface GamesTableRowProps {
  row: Row<Game>
  onEdit: (game: Game) => void
  onDelete: (game: Game) => void
}

const DataRow = ({ row, onDelete, onEdit }: GamesTableRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null)
  const { state, className } = useTransition({
    ref,
    hide: row.isHidden(),
    styles: {
      toHide: "h-0 border-none opacity-0",
      toShow: "h-12 border-b opacity-100",
      whileHide: "hidden",
    },
  })

  if (state === "hide") return null

  return (
    <NativeTable.Row
      key={row.id}
      ref={ref}
      className={cn(
        "transition-[height,opacity] duration-300 motion-reduce:duration-0",
        className
      )}
    >
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
  )
}

interface GamesTableBodyProps {
  table: Table<Game>
  onEdit: (game: Game) => void
  onDelete: (game: Game) => void
}

export const GamesTableBody = ({
  table,
  onEdit,
  onDelete,
}: GamesTableBodyProps) => (
  <NativeTable.Body>
    {table.getRowModel().rows.map(row => (
      <DataRow key={row.id} row={row} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </NativeTable.Body>
)

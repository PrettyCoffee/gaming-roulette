import { Dispatch, useState } from "react"

import { Row, Table } from "@tanstack/react-table"
import { Filter, PenBox, Trash } from "lucide-react"

import { IconButton } from "~/components/IconButton"
import { Input } from "~/components/ui/input"
import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"
import { cn } from "~/utils/utils"

import { AddGame } from "./AddGame"

interface TableActionsProps {
  row: Row<Game>
  onEdit: Dispatch<Game>
  onDelete: Dispatch<Game>
}
export const TableRowActions = ({
  row,
  onEdit,
  onDelete,
}: TableActionsProps) => (
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

const TableFilter = ({ table }: { table: Table<Game> }) => {
  const [filtering, setFiltering] = useState(false)

  const toggle = () => {
    setFiltering(prev => !prev)
    table.clearFilter()
  }

  return (
    <>
      {filtering && (
        <div className="absolute right-[calc(100%-theme(width.2))] flex">
          <div className="inline-block h-10 w-2 shrink-0 bg-gradient-to-r from-transparent to-background" />
          <div className="bg-background">
            <Input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="mx-2 w-40 shadow-medium"
              placeholder="Filter"
              value={table.getState().filter ?? ""}
              onChange={({ target }) => table.setFilter(target.value)}
              onKeyDown={({ key }) => key === "Escape" && toggle()}
            />
          </div>
        </div>
      )}
      <IconButton
        filled={filtering}
        icon={Filter}
        onClick={toggle}
        title="Toggle filter"
      />
    </>
  )
}

export const TableHeaderActions = ({ table }: { table: Table<Game> }) => (
  <NativeTable.Head
    className={cn(
      "sticky right-0 z-20 overflow-visible bg-transparent px-0 py-1"
    )}
  >
    <div className="ml-auto flex w-max items-center">
      <div className="inline-block h-10 w-2 shrink-0 bg-gradient-to-r from-transparent to-background" />
      <div className="inline-flex justify-end bg-background pr-1">
        <TableFilter table={table} />
        <AddGame />
      </div>
    </div>
  </NativeTable.Head>
)

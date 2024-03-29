import { Dispatch } from "react"

import { Row } from "@tanstack/react-table"
import { PenBox, Trash } from "lucide-react"

import { IconButton } from "~/components/IconButton"
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

export const TableHeaderActions = () => (
  <NativeTable.Head
    className={cn("sticky right-0 overflow-visible bg-transparent px-0 py-1")}
  >
    <div className="ml-auto flex w-max items-center">
      <div className="inline-block h-10 w-2 shrink-0 bg-gradient-to-r from-transparent to-background" />
      <div className="inline-flex justify-end bg-background pr-1">
        <AddGame />
      </div>
    </div>
  </NativeTable.Head>
)

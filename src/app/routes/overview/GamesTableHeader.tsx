import { PropsWithChildren } from "react"

import { flexRender, Header, Table } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "components/buttons/Button"
import { Icon } from "components/primitives/Icon"
import { Table as NativeTable } from "components/Table"
import { Game } from "data/games"

import { actionsCellWidth, TableHeaderActions } from "./TableActions"

interface HeaderProp {
  header: Header<Game, unknown>
}

const Truncated = ({ children }: PropsWithChildren) => (
  <span className="flex-1 truncate text-left">{children}</span>
)

const SortableHead = ({ header, children }: PropsWithChildren<HeaderProp>) => {
  const headerText = (
    <span className="flex-1 truncate text-left">{children}</span>
  )
  if (!header.column.getCanSort()) return headerText

  const sortState = header.column.getIsSorted()
  return (
    <Button
      variant="flat"
      onClick={() => header.column.toggleSorting()}
      className="-ml-2 h-8 w-[calc(100%+theme(width.4))] justify-between gap-0 px-2"
      style={{ justifyContent: header.column.columnDef.meta?.align }}
    >
      <Truncated>{children}</Truncated>
      {sortState === "asc" && <Icon icon={ChevronUp} />}
      {sortState === "desc" && <Icon icon={ChevronDown} />}
    </Button>
  )
}

const isFlex = ({ subHeaders, column }: HeaderProp["header"]) =>
  column.columnDef.meta?.flex ||
  subHeaders.some(({ column }) => column.columnDef.meta?.flex)

const HeaderCell = ({ header }: HeaderProp) => {
  const HeadContent = header.column.getCanSort() ? SortableHead : Truncated
  return (
    <NativeTable.Head
      key={header.id}
      style={{
        width: `${header.getSize()}rem`,
        textAlign: header.column.columnDef.meta?.align,
        flex: isFlex(header) ? "1" : undefined,
      }}
    >
      <HeadContent header={header}>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </HeadContent>
    </NativeTable.Head>
  )
}

export const GamesTableHeader = ({ table }: { table: Table<Game> }) => (
  <NativeTable.Header>
    {table.getHeaderGroups().map(({ id, headers }) => (
      <NativeTable.Row key={id}>
        {headers.map(header => (
          <HeaderCell key={header.id} header={header} />
        ))}

        {headers.every(({ subHeaders }) => subHeaders.length === 0) ? (
          <TableHeaderActions table={table} />
        ) : (
          <NativeTable.Head
            className="h-0"
            style={{ width: actionsCellWidth }}
          />
        )}
      </NativeTable.Row>
    ))}
  </NativeTable.Header>
)

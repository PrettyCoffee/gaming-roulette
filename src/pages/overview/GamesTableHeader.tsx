import { PropsWithChildren } from "react"

import { flexRender, Header, Table } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Icon } from "~/components/Icon"
import { Button } from "~/components/ui/button"
import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"

import { TableHeaderActions } from "./TableActions"

interface HeaderProp {
  header: Header<Game, unknown>
}

const SortableHead = ({ header, children }: PropsWithChildren<HeaderProp>) => {
  if (!header.column.getCanSort()) return <>{children}</>

  const sortState = header.column.getIsSorted()
  return (
    <Button
      variant="flat"
      onClick={() => header.column.toggleSorting()}
      className="-ml-2 h-8 w-[calc(100%+theme(width.4))] justify-between gap-0 px-2"
      style={{ justifyContent: header.column.columnDef.meta?.align }}
    >
      <span className="truncate">{children}</span>
      {sortState === "asc" && <Icon icon={ChevronUp} />}
      {sortState === "desc" && <Icon icon={ChevronDown} />}
    </Button>
  )
}

const HeaderCell = ({ header }: HeaderProp) => {
  return (
    <NativeTable.Head
      key={header.id}
      style={{
        width: `${header.getSize()}rem`,
        textAlign: header.column.columnDef.meta?.align,
      }}
    >
      <SortableHead header={header}>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </SortableHead>
    </NativeTable.Head>
  )
}

export const GamesTableHeader = ({ table }: { table: Table<Game> }) => {
  return (
    <NativeTable.Header>
      {table.getHeaderGroups().map(({ id, headers }) => (
        <NativeTable.Row key={id}>
          {headers.map(header => (
            <HeaderCell key={header.id} header={header} />
          ))}

          {headers.every(({ subHeaders }) => subHeaders.length === 0) ? (
            <TableHeaderActions table={table} />
          ) : (
            <NativeTable.Head className="h-0" />
          )}
        </NativeTable.Row>
      ))}
    </NativeTable.Header>
  )
}

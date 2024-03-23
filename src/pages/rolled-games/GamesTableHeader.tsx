import { flexRender, Header, Table } from "@tanstack/react-table"

import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"

const HeaderCell = ({ header }: { header: Header<Game, unknown> }) => (
  <NativeTable.Head key={header.id}>
    {header.isPlaceholder
      ? null
      : flexRender(header.column.columnDef.header, header.getContext())}
  </NativeTable.Head>
)

export const GamesTableHeader = ({ table }: { table: Table<Game> }) => {
  return (
    <NativeTable.Header>
      {table.getHeaderGroups().map(headerGroup => (
        <NativeTable.Row key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <HeaderCell key={header.id} header={header} />
          ))}
          {/* Empty Actions Header */}
          <NativeTable.Head />
        </NativeTable.Row>
      ))}
    </NativeTable.Header>
  )
}

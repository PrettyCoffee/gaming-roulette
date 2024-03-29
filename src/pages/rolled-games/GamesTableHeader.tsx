import { Fragment, PropsWithChildren } from "react"

import { flexRender, Header, SortDirection, Table } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Icon } from "~/components/Icon"
import { Button } from "~/components/ui/button"
import { Table as NativeTable } from "~/components/ui/table"
import { Game } from "~/data/games"
import { cn } from "~/utils/utils"

interface SortableHeadProps {
  sortState: SortDirection | false
  onClick: () => void
}
const SortableHead = ({
  onClick,
  sortState,
  children,
}: PropsWithChildren<SortableHeadProps>) => (
  <Button
    variant="flat"
    onClick={onClick}
    className="-ml-2 h-8 w-[calc(100%+theme(width.4))] justify-start px-2"
  >
    {children}
    {sortState === "asc" && <Icon icon={ChevronUp} className="ml-auto" />}
    {sortState === "desc" && <Icon icon={ChevronDown} className="ml-auto" />}
  </Button>
)

const HeaderCell = ({ header }: { header: Header<Game, unknown> }) => {
  const sortState = header.column.getIsSorted()
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext()
  )
  const Comp = header.column.getCanSort() ? SortableHead : Fragment

  return (
    <NativeTable.Head
      key={header.id}
      style={{ width: `${header.getSize()}rem` }}
      colSpan={header.colSpan}
      className={cn(header.column.getCanSort() ? "h-10" : "h-8")}
    >
      <Comp sortState={sortState} onClick={() => header.column.toggleSorting()}>
        {content}
      </Comp>
    </NativeTable.Head>
  )
}

export const GamesTableHeader = ({ table }: { table: Table<Game> }) => {
  return (
    <NativeTable.Header>
      {table.getHeaderGroups().map(headerGroup => (
        <NativeTable.Row key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <HeaderCell key={header.id} header={header} />
          ))}

          <NativeTable.Head className="h-0">
            {/* Empty Actions Header */}
          </NativeTable.Head>
        </NativeTable.Row>
      ))}
    </NativeTable.Header>
  )
}

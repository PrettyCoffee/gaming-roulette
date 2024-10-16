import {
  DeepKeys,
  Row,
  RowData,
  Table,
  TableFeature,
} from "@tanstack/react-table"

type FilterState = string | null
interface FilterTableState {
  filter: FilterState
}

interface FilterInstance {
  setFilter: (filter: FilterState) => void
  clearFilter: () => void
  isFiltering: () => boolean
}

interface FilterRow {
  isHidden: () => boolean
}

/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface TableState extends FilterTableState {}
  interface Table<TData extends RowData> extends FilterInstance {}
  interface Row<TData extends RowData> extends FilterRow {}
}
/* eslint-enable */

const normalizeString = (text: string) =>
  text.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()

const find = (data: unknown[], filter: string) => {
  const text = JSON.stringify(data)
  return normalizeString(text).includes(normalizeString(filter))
}

const getDeepData = (row: Row<unknown>, keys: string[]) =>
  keys.map(key =>
    key.split(".").reduce((acc, key) => {
      if (acc == null) return ""
      switch (typeof acc) {
        case "object":
          return (acc as Record<string, unknown>)[key]
        case "string":
        case "number":
        case "boolean":
          return acc.toString()
        default:
          return ""
      }
    }, row.original)
  )

export const FilterFeature = <TData extends RowData>(
  filterKeys: DeepKeys<TData>[]
): TableFeature<RowData> => ({
  getInitialState: (state): FilterTableState => {
    return {
      filter: null,
      ...state,
    }
  },

  createTable: <TData extends RowData>(table: Table<TData>) => {
    table.setFilter = filter => {
      table.setState(old => ({ ...old, filter }))
    }
    table.clearFilter = () => {
      table.setFilter(null)
    }
    table.isFiltering = () => {
      const { filter } = table.getState()
      return Boolean(filter)
    }
  },

  createRow: <TData extends RowData>(row: Row<TData>, table: Table<TData>) => {
    row.isHidden = () => {
      const { filter } = table.getState()
      if (filter == null) return false
      const filterData = getDeepData(
        row as Row<unknown>,
        filterKeys as string[]
      )
      return !find(filterData, filter)
    }
  },
})

const splitRow = (row: string) =>
  row
    .replace(/^\|/, "") // remove leading separator
    .replace(/\|$/, "") // remove trailing separator
    .split("|")
    .map(cell => cell.trim())

interface TableRowsResult {
  rows: string[][]
  foundEnd: boolean
}
const extractTableRows = (lines: string[]) =>
  lines.reduce<TableRowsResult>(
    (result, line) => {
      const { foundEnd, rows } = result
      if (foundEnd) return result
      if (!line.startsWith("|")) {
        return rows.length > 0 ? { ...result, foundEnd: true } : result
      }
      return { ...result, rows: [...rows, splitRow(line)] }
    },
    { rows: [], foundEnd: false }
  ).rows

const formatTable = (rows: string[][]) => {
  const separatorIndex = rows.findIndex(row =>
    row.every(cell => cell.replaceAll(/[\s-]*/gi, "") === "")
  )
  const header = rows.slice(0, separatorIndex).at(-1) ?? []
  const body = rows.slice(separatorIndex + 1)

  return body.map(row =>
    row.reduce<Record<string, string>>((result, cell, index) => {
      const headerCell = (header[index] ?? "").toLowerCase()
      result[headerCell] = cell
      return result
    }, {})
  )
}

export const parseMarkdownTable = (markdown: string) => {
  const lines = markdown.split("\n").map(line => line.trim())
  const rows = extractTableRows(lines)
  return formatTable(rows)
}

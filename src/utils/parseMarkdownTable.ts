const amountOfColumns = (line: string) => line.replace(/[^|]*/gi, "").length - 1

const extractTableLines = (lines: string[], columns: string[]) =>
  lines.reduce(
    (result, line) => {
      if (!line.startsWith("|") || line.replace(/[|-\s]/gi, "") === "") {
        return result
      }

      if (!result.header) {
        return {
          ...result,
          header: line,
        }
      }

      if (columns.length !== amountOfColumns(line)) {
        return result
      }

      return {
        ...result,
        rows: result.body.push(line),
      }
    },
    { header: null as string | null, body: [] as string[] }
  )

const parseTableLines = <ColumnName extends string>(
  columns: ColumnName[],
  lines: string[]
): Record<ColumnName, string>[] => {
  return lines.map(line => {
    const values = line
      .split("|")
      .map(value => value.trim())
      .filter(Boolean)

    const result = {} as Record<ColumnName, string>
    columns.forEach((column, index) => {
      const value = values[index]
      if (value == null) return
      result[column] = value
    })
    return result
  })
}

export const parseMarkdownTable = <ColumnName extends string>(
  markdown: string,
  columns: ColumnName[]
): Record<ColumnName, string>[] => {
  const lines = markdown.split("\n").map(line => line.trim())

  const { body } = extractTableLines(lines, columns)

  return parseTableLines(columns, body)
}

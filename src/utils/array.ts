type RangeOptions =
  | number
  | {
      start: number
      end: number
      step?: number
    }
export const createRange = (options: RangeOptions) => {
  const {
    start,
    end,
    step = 1,
  } = typeof options === "number" ? { start: 0, end: options } : options
  return Array.from(
    { length: (end - start) / step },
    (_, i) => start + i * step
  )
}

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let pos1 = shuffled.length - 1; pos1 > 0; pos1--) {
    const pos2 = Math.floor(Math.random() * (pos1 + 1))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ;[shuffled[pos1], shuffled[pos2]] = [shuffled[pos2]!, shuffled[pos1]!]
  }
  return shuffled
}

export const shuffle = <T>(...arrays: T[][]) => shuffleArray(arrays.flat())

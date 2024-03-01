import { randomIntBetween } from "./number"

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
  const copy = [...array]
  return array
    .map(() => {
      const index = randomIntBetween(0, copy.length - 1)
      return copy.splice(index, 1)[0]
    })
    .filter(Boolean) as T[]
}

export const shuffle = <T>(...arrays: T[][]) => shuffleArray(arrays.flat())

export const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min

export const sum = (...array: (number | number[])[]) =>
  array.flat().reduce((acc, value) => acc + value, 0)

export const clamp = (value: number, min = -Infinity, max = Infinity) =>
  Math.min(Math.max(value, min), max)

interface ParseNumberOptions {
  min?: number
  max?: number
}
export const parseNumber = (
  value: string,
  { min, max }: ParseNumberOptions = {}
) => {
  const string = value.match(/(-?\d*\.?\d*)/)?.[0] ?? ""
  const number = parseFloat(string)

  if (Number.isNaN(number)) {
    return { string, number: undefined }
  }

  const clamped = clamp(number, min, max)
  if (clamped !== number) {
    return { string: String(clamped), number: clamped }
  }

  return {
    string,
    number: parseFloat(string) || undefined,
  }
}

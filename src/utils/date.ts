export const DAY = 1000 * 60 * 60 * 24
export const WEEK = DAY * 7
export const MONTH = DAY * 30
export const YEAR = DAY * 365

export const today = () => {
  const date = new Date()
  const year = date.getFullYear().toString().padStart(4, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const timeBetween = (date1 = today(), date2 = today()) =>
  Math.abs(new Date(date1).getTime() - new Date(date2).getTime())

export const timeSince = (date: string) =>
  new Date().getTime() - new Date(date).getTime()

const floor = (value: number, precision: number) =>
  Math.floor(value * 10 ** precision) / 10 ** precision

export const readableTime = (time: number, precision = 0) => {
  const days = floor(time / DAY, precision)
  if (days === 1) return "1 Day"
  if (days < 7) return `${days} Days`

  const weeks = floor(time / WEEK, precision)
  if (weeks === 1) return "1 Week"
  if (weeks < 4) return `${weeks} Weeks`

  const months = floor(time / MONTH, precision)
  if (months === 1) return "1 Month"
  if (months < 12) return `${months} Months`

  const years = floor(time / YEAR, precision)
  if (years === 1) return "1 Year"
  return `${years} Years`
}

export const dateIsValid = (date: string) =>
  !Number.isNaN(new Date(date).valueOf())

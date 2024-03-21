export const DAY = 1000 * 60 * 60 * 24
export const WEEK = DAY * 7
export const MONTH = DAY * 30
export const YEAR = DAY * 365

export const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const timeBetween = (date1 = today(), date2 = today()) =>
  Math.abs(new Date(date1).getTime() - new Date(date2).getTime())

export const timeSince = (date: string) =>
  new Date().getTime() - new Date(date).getTime()

export const readableTime = (time: number) => {
  const days = Math.floor(time / DAY)
  if (days < 2) return "1 Day"
  if (days < 7) return `${days} Days`

  const weeks = Math.floor(time / WEEK)
  if (weeks < 2) return "1 Week"
  if (weeks < 4) return `${weeks} Weeks`

  const months = Math.floor(time / MONTH)
  if (months < 2) return "1 Month"
  if (months < 12) return `${months} Months`

  const years = Math.floor(time / YEAR)
  if (years < 2) return "1 Year"
  return `${years} Years`
}

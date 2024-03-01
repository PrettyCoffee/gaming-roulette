export const DAY = 1000 * 60 * 60 * 24
export const WEEK = DAY * 7

export const tomorrow = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  return date
}

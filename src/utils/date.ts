export const DAY = 1000 * 60 * 60 * 24
export const WEEK = DAY * 7

export const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

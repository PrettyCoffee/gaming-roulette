export const getFontSize = (element = document.documentElement) =>
  Number.parseFloat(getComputedStyle(element).fontSize)

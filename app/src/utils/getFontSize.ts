export const getFontSize = (element = document.documentElement) =>
  parseFloat(getComputedStyle(element).fontSize)

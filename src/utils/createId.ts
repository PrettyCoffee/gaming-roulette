export const createId = () =>
  [...crypto.getRandomValues(new Uint8Array(10))]
    .map(n => n.toString(36))
    .join("")
    .toUpperCase()

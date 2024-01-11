export const playAudio = (url: string) => {
  const audio = new Audio(url)
  audio.volume = 0.05
  return audio.play()
}

import { settingsAtom } from "~/data/settings"

interface Options {
  volume?: number
  playbackRate?: number
  preservesPitch?: boolean
}

export const playAudio = (
  url: string,
  {
    volume = settingsAtom.get().volume,
    playbackRate = 1,
    preservesPitch = true,
  }: Options = {}
) => {
  const audio = new Audio(url)
  audio.volume = volume
  audio.playbackRate = playbackRate
  audio.preservesPitch = preservesPitch
  return audio.play()
}

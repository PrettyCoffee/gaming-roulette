import { audioSettingsAtom } from "~/data/audioSettings"

interface Options {
  volume?: number
  playbackRate?: number
  preservesPitch?: boolean
}

export const playAudio = (
  url: string,
  { volume = 1, playbackRate = 1, preservesPitch = true }: Options = {}
) => {
  if (audioSettingsAtom.get().muted) return
  const audio = new Audio(url)
  audio.volume = volume * audioSettingsAtom.get().master
  audio.playbackRate = playbackRate
  audio.preservesPitch = preservesPitch
  return audio.play()
}

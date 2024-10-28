import { audioSettingsAtom } from "data/audioSettings"

const blocked: Record<string, boolean> = {}

interface Options {
  volume?: number
  playbackRate?: number
  preservesPitch?: boolean
}

export const playAudio = (
  url: string,
  { volume = 1, playbackRate = 1, preservesPitch = true }: Options = {}
) => {
  const isBlocked = blocked[url]
  if (audioSettingsAtom.get().muted || isBlocked) return
  const audio = new Audio(url)
  audio.volume = volume * audioSettingsAtom.get().master
  audio.playbackRate = playbackRate
  audio.preservesPitch = preservesPitch

  blocked[url] = true
  setTimeout(() => {
    blocked[url] = false
  }, 15)

  void audio.play()
}

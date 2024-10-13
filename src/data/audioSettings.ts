import { createAtom, localStorage, useAtom } from "~/lib/yaasl"

export interface AudioOptions {
  muted: boolean
  master: number
  buttonVolume: number
  victoryVolume: number
  spinnerVolume: number
}

export const audioSettingsAtom = createAtom<AudioOptions>({
  name: "audio-settings",
  defaultValue: {
    muted: false,
    master: 0.5,
    buttonVolume: 0.5,
    spinnerVolume: 0.5,
    victoryVolume: 1,
  },
  effects: [localStorage()],
})

export const useAudioSettings = () => useAtom(audioSettingsAtom)

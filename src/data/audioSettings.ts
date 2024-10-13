import { reduxDevtools } from "@yaasl/devtools"
import { createAtom, localStorage, useAtom } from "@yaasl/react"

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
  effects: [localStorage(), reduxDevtools({ disable: import.meta.env.PROD })],
})

export const useAudioSettings = () => useAtom(audioSettingsAtom)

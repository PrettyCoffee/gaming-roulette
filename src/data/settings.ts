import { reduxDevtools } from "@yaasl/devtools"
import { atom, localStorage, useAtom } from "@yaasl/react"

interface Settings {
  pickerView: "tags" | "wheel" | "classic-wheel" | "half-wheel"
  volume: number
  compactNavigation: boolean
}

export const settingsAtom = atom<Settings>({
  name: "settings",
  defaultValue: {
    pickerView: "wheel",
    volume: 0.5,
    compactNavigation: false,
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useSettings = () => useAtom(settingsAtom)

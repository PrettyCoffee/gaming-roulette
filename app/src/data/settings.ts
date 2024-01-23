import { atom, localStorage, reduxDevtools, useAtom } from "yaasl/react"

interface Settings {
  pickerView: "tags" | "wheel"
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

import { atom, localStorage, reduxDevtools, useAtom } from "yaasl/react"

interface Settings {
  pickerView: "tags" | "wheel"
  volume: number
}

export const settingsAtom = atom<Settings>({
  name: "settings",
  defaultValue: {
    pickerView: "tags",
    volume: 0.5,
  },
  middleware: [localStorage(), reduxDevtools()],
})

export const useSettings = () => useAtom(settingsAtom)

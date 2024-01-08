import { atom, localStorage, reduxDevtools, useAtom } from "yaasl/react"

interface Settings {
  pickerView: "tags" | "wheel"
}

const settingsAtom = atom<Settings>({
  name: "settings",
  defaultValue: {
    pickerView: "tags",
  },
  middleware: [localStorage(), reduxDevtools()],
})

export const useSettings = () => useAtom(settingsAtom)

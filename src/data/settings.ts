import { reduxDevtools } from "@yaasl/devtools"
import { atom, localStorage, useAtom } from "@yaasl/react"

export interface GeneralSettings {
  pickerView: "tags" | "wheel" | "classic-wheel" | "half-wheel"
  compactNavigation: boolean
}

export const settingsAtom = atom<GeneralSettings>({
  name: "settings",
  defaultValue: {
    pickerView: "wheel",
    compactNavigation: false,
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useSettings = () => useAtom(settingsAtom)

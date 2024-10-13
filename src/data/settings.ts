import { reduxDevtools } from "@yaasl/devtools"
import { createAtom, localStorage, useAtom } from "@yaasl/react"

export interface GeneralSettings {
  pickerView: "tags" | "wheel" | "classic-wheel" | "half-wheel"
  compactNavigation: boolean
}

export const settingsAtom = createAtom<GeneralSettings>({
  name: "settings",
  defaultValue: {
    pickerView: "wheel",
    compactNavigation: false,
  },
  effects: [localStorage(), reduxDevtools({ disable: import.meta.env.PROD })],
})

export const useSettings = () => useAtom(settingsAtom)

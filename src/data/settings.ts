import { createAtom, localStorage, useAtom } from "~/lib/yaasl"

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
  effects: [localStorage()],
})

export const useSettings = () => useAtom(settingsAtom)

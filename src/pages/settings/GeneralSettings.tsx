// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import { InputLabel } from "~/components/InputLabel"
import { RadioGroup } from "~/components/ui/radio-group"
import { Switch } from "~/components/ui/switch"
import { useSettings } from "~/data/settings"

import { Grid } from "./Grid"

const SelectPickerView = () => {
  const [{ pickerView }, setSettings] = useSettings()

  return (
    <>
      <InputLabel htmlFor="" className="mb-2">
        Picker view
      </InputLabel>
      <RadioGroup.Root
        value={pickerView}
        onValueChange={value =>
          setSettings(prev => ({
            ...prev,
            pickerView: value as "wheel",
          }))
        }
      >
        <RadioGroup.Item value="wheel">Wheel</RadioGroup.Item>
        <RadioGroup.Item value="classic-wheel">Classic wheel</RadioGroup.Item>
        <RadioGroup.Item value="half-wheel">Half wheel</RadioGroup.Item>
        <RadioGroup.Item value="tags">Tags</RadioGroup.Item>
      </RadioGroup.Root>
    </>
  )
}

const NavigationSettings = () => {
  const [{ compactNavigation }, setSettings] = useSettings()

  return (
    <>
      <InputLabel htmlFor="" className="mb-2">
        Navigation
      </InputLabel>
      <label className="flex items-center gap-2">
        <Switch
          checked={compactNavigation}
          onCheckedChange={value =>
            setSettings(prev => ({
              ...prev,
              compactNavigation: value,
            }))
          }
        />{" "}
        Compact sidebar
      </label>
    </>
  )
}

export const GeneralSettings = () => (
  <Grid.Root>
    <Grid.Item fullWidth>
      <SelectPickerView />
    </Grid.Item>

    <Grid.Item>
      <NavigationSettings />
    </Grid.Item>
  </Grid.Root>
)

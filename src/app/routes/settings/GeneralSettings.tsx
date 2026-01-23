import { PropsWithChildren } from "react"

import { BaseButton } from "components/buttons/BaseButton"
import { InputLabel } from "components/inputs/InputLabel"
import { Switch } from "components/inputs/switch"
import { gamesA, gamesB, Player } from "data/players"
import { useSettings } from "data/settings"
import { ClassicWheel, HalfWheel, Tags, Wheel } from "features/spinners"
import { shuffle } from "utils/array"
import { cn } from "utils/utils"

import { Grid } from "./Grid"

const demoGames = shuffle([
  ...gamesA
    .slice(0, 5)
    .map(name => ({ name, player: { color: "red" } as Player })),
  ...gamesA
    .slice(5)
    .map(name => ({ name, player: { color: "blue" } as Player })),
  ...gamesB
    .slice(0, 5)
    .map(name => ({ name, player: { color: "green" } as Player })),
  ...gamesB
    .slice(5)
    .map(name => ({ name, player: { color: "yellow" } as Player })),
])
const demoProps = {
  items: demoGames,
  current: 5,
  transitionDuration: 0,
}

interface ViewButtonProps {
  checked: boolean
  onClick: () => void
}
const ViewButton = ({
  checked,
  onClick,
  children,
}: PropsWithChildren<ViewButtonProps>) => (
  <BaseButton
    aria-checked={checked}
    onClick={onClick}
    className={cn(
      "h-24 flex-1 rounded-md p-2 hover:bg-base/50",
      checked && "outline outline-1 outline-primary"
    )}
  >
    {children}
  </BaseButton>
)

const SelectPickerView = () => {
  const [{ pickerView }, setSettings] = useSettings()

  const setView = (value: typeof pickerView) => () =>
    setSettings(prev => ({
      ...prev,
      pickerView: value,
    }))

  return (
    <>
      <InputLabel htmlFor="" className="mb-2">
        Picker view
      </InputLabel>

      <div className="flex justify-evenly gap-2">
        <ViewButton checked={pickerView === "wheel"} onClick={setView("wheel")}>
          <Wheel {...demoProps} />
        </ViewButton>
        <ViewButton
          checked={pickerView === "half-wheel"}
          onClick={setView("half-wheel")}
        >
          <HalfWheel {...demoProps} />
        </ViewButton>
        <ViewButton
          checked={pickerView === "classic-wheel"}
          onClick={setView("classic-wheel")}
        >
          <ClassicWheel {...demoProps} />
        </ViewButton>
        <ViewButton checked={pickerView === "tags"} onClick={setView("tags")}>
          <Tags {...demoProps} />
        </ViewButton>
      </div>
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

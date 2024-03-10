// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import { PropsWithChildren } from "react"

import { BaseButton } from "~/components/base/BaseButton"
import { InputLabel } from "~/components/InputLabel"
import { Switch } from "~/components/ui/switch"
import { gamesA, gamesB } from "~/data/players"
import { useSettings } from "~/data/settings"
import { shuffle } from "~/utils/array"
import { cn } from "~/utils/utils"

import { Grid } from "./Grid"
import { ClassicWheel } from "../spinner/ClassicWheel"
import { HalfWheel } from "../spinner/HalfWheel"
import { Tags } from "../spinner/Tags"
import { Wheel } from "../spinner/Wheel"

const demoGames = shuffle([
  ...gamesA.slice(0, 5).map(game => ({ game, color: "red" })),
  ...gamesA.slice(5).map(game => ({ game, color: "blue" })),
  ...gamesB.slice(0, 5).map(game => ({ game, color: "green" })),
  ...gamesB.slice(5).map(game => ({ game, color: "yellow" })),
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
      "h-24 flex-1 p-2 rounded-md hover:bg-base/50",
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

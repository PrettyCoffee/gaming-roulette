import { useEffect, useId, useRef } from "react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click.mp3"
import { InputLabel } from "~/components/InputLabel"
import { RadioGroup } from "~/components/ui/radio-group"
import { Slider } from "~/components/ui/slider"
import { Switch } from "~/components/ui/switch"
import { useSettings } from "~/data/settings"
import { playAudio } from "~/utils/playAudio"

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
            pickerView: value as "tags" | "wheel",
          }))
        }
      >
        <RadioGroup.Item value="wheel">Wheel</RadioGroup.Item>
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

const AudioSlider = () => {
  const id = useId()
  const [{ volume }, setSettings] = useSettings()
  const latestValue = useRef(volume)

  useEffect(() => {
    if (volume === latestValue.current) return
    latestValue.current = volume

    void playAudio(clickSound, {
      volume,
      playbackRate: 2,
      preservesPitch: false,
    })
  }, [volume])

  return (
    <>
      <InputLabel htmlFor={id} className="mb-2">
        Audio volume
      </InputLabel>
      <Slider
        id={id}
        min={0}
        max={1}
        step={0.05}
        value={[volume]}
        onValueChange={([value]) =>
          setSettings(prev => ({ ...prev, volume: value ?? 0 }))
        }
      />
      <span className="block text-sm text-muted-foreground">
        {Math.floor(volume * 100)}%
      </span>
    </>
  )
}

export const GeneralSettings = () => (
  <div className="grid grid-cols-2 gap-2 p-2 pt-0">
    <div className="col-span-1">
      <SelectPickerView />
    </div>

    <div className="col-span-1">
      <NavigationSettings />
    </div>

    <div className="col-span-1">
      <AudioSlider />
    </div>
  </div>
)

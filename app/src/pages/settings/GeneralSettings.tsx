import { useEffect, useId, useRef } from "react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click.mp3"
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { RadioGroup } from "~/components/ui/radio-group"
import { Slider } from "~/components/ui/slider"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { playAudio } from "~/utils/playAudio"

const PlayerName = ({ player }: { player: "player1" | "player2" }) => {
  const id = useId()
  const { players, setPlayerAttribute } = usePlayers()
  const { name } = players[player]

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        {player === "player1" ? "Player 1" : "Player 2"}
      </InputLabel>
      <Input
        id={id}
        value={name}
        onChange={({ target }) =>
          setPlayerAttribute(player, "name", target.value)
        }
      />
    </>
  )
}

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
        <RadioGroup.Item value="tags">Tags</RadioGroup.Item>
        <RadioGroup.Item value="wheel">Wheel</RadioGroup.Item>
      </RadioGroup.Root>
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
      <PlayerName player="player1" />
    </div>

    <div className="col-span-1">
      <PlayerName player="player2" />
    </div>

    <div className="col-span-1">
      <SelectPickerView />
    </div>

    <div className="col-span-1">
      <AudioSlider />
    </div>
  </div>
)

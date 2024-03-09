import { useEffect, useId, useRef } from "react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click-enhanced.mp3"
import { InputLabel } from "~/components/InputLabel"
import { Slider } from "~/components/ui/slider"
import { AudioOptions, useAudioSettings } from "~/data/audioSettings"
import { playAudio } from "~/utils/playAudio"

import { Grid } from "./Grid"

const AudioSlider = ({
  label,
  name,
}: {
  label: string
  name: keyof Omit<AudioOptions, "muted">
}) => {
  const id = useId()
  const [audioSettings, setAudioSettings] = useAudioSettings()
  const value = audioSettings[name]
  const latestValue = useRef(value)

  useEffect(() => {
    if (value === latestValue.current) return
    latestValue.current = value

    void playAudio(clickSound, {
      volume: name === "master" ? 1 : value,
      playbackRate: 2,
      preservesPitch: false,
    })
  }, [name, value])

  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Slider
        id={id}
        min={0}
        max={1}
        step={0.05}
        value={[value]}
        onValueChange={([value]) =>
          setAudioSettings(prev => ({ ...prev, [name]: value ?? 0 }))
        }
      />
      <span className="block text-sm text-muted-foreground">
        {Math.floor(value * 100)}%
      </span>
    </>
  )
}

export const AudioSettings = () => (
  <Grid.Root>
    <Grid.Item>
      <AudioSlider label="Master volume" name="master" />
    </Grid.Item>
    <Grid.Item newLine>
      <AudioSlider label="Button volume" name="buttonVolume" />
    </Grid.Item>
    <Grid.Item>
      <AudioSlider label="Spinner volume" name="spinnerVolume" />
    </Grid.Item>
    <Grid.Item>
      <AudioSlider label="Victory volume" name="victoryVolume" />
    </Grid.Item>
  </Grid.Root>
)

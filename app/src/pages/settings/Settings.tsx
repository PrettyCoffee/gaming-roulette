import { PropsWithChildren, useEffect, useId, useRef, useState } from "react"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import clickSound from "~/assets/click.mp3"
import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { RadioGroup } from "~/components/ui/radio-group"
import { Slider } from "~/components/ui/slider"
import { useGithub } from "~/data/github"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { playAudio } from "~/utils/playAudio"

const SectionTitle = ({ children }: PropsWithChildren) => (
  <div className="col-span-full [&:not(:first-of-type)]:mt-2">
    <h2 className="text-foreground font-bold text-md"> - {children} - </h2>
  </div>
)

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

const RepoOwner = () => {
  const id = useId()
  const { repoOwner, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Repo owner
      </InputLabel>
      <Input
        id={id}
        value={repoOwner}
        onChange={({ target }) => setGithubAttribute("repoOwner", target.value)}
      />
    </>
  )
}

const RepoName = () => {
  const id = useId()
  const { repoName, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Repo name
      </InputLabel>
      <Input
        id={id}
        value={repoName}
        onChange={({ target }) => setGithubAttribute("repoName", target.value)}
      />
    </>
  )
}

const GithubToken = () => {
  const id = useId()
  const [showToken, setShowToken] = useState(false)

  const { token, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Github token
      </InputLabel>
      <Input
        id={id}
        type={showToken ? "text" : "password"}
        value={showToken ? token : "xxxxxxxx"}
        onChange={({ target }) => setGithubAttribute("token", target.value)}
        onFocus={() => setShowToken(true)}
        onBlur={() => setShowToken(false)}
      />
    </>
  )
}

export const Settings = () => (
  <div className="grid grid-cols-2 gap-2 p-2 pt-0">
    <h1 className="sr-only">Settings</h1>

    <SectionTitle>General</SectionTitle>

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

    <SectionTitle>Github</SectionTitle>

    <div className="col-span-1">
      <RepoOwner />
    </div>

    <div className="col-span-1">
      <RepoName />
    </div>

    <div className="col-span-1">
      <GithubToken />
    </div>

    <div className="col-span-1"></div>
  </div>
)

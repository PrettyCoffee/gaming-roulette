import { useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { RadioGroup } from "~/components/ui/radio-group"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"

export const Settings = () => {
  const { players, setPlayerAttribute } = usePlayers()
  const { player1, player2 } = players

  const [showToken, setShowToken] = useState(false)

  const [settings, setSettings] = useSettings()

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <div className="col-span-1">
        <InputLabel className="mb-2" htmlFor="player-1">
          Player 1
        </InputLabel>
        <Input
          id="player-1"
          value={player1.name}
          onChange={({ target }) =>
            setPlayerAttribute("player1", "name", target.value)
          }
        />
      </div>

      <div className="col-span-1">
        <InputLabel className="mb-2" htmlFor="player-2">
          Player 2
        </InputLabel>
        <Input
          id="player-2"
          value={player2.name}
          onChange={({ target }) =>
            setPlayerAttribute("player2", "name", target.value)
          }
        />
      </div>

      <div className="col-span-full">
        <InputLabel htmlFor="">Picker view</InputLabel>
        <RadioGroup.Root
          value={settings.pickerView}
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
      </div>

      <div className="col-span-full">
        <InputLabel className="mb-2" htmlFor="github">
          Github token
        </InputLabel>
        <Input
          id="github"
          type={showToken ? "text" : "password"}
          disabled
          onFocus={() => setShowToken(true)}
          onBlur={() => setShowToken(false)}
        />
      </div>
    </div>
  )
}

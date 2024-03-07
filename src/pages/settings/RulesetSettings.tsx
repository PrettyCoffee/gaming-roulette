import { ChangeEvent, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { Switch } from "~/components/ui/switch"
import { Ruleset, useRuleset } from "~/data/ruleset"

import { Grid } from "./Grid"

export const GamesPerPersonInput = () => {
  const [{ gamesPerPerson }, setRuleset] = useRuleset()
  const [value, setValue] = useState(String(gamesPerPerson))

  const setGamesPerPerson = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const numbers = target.value.replace(/\D/g, "")
    setValue(numbers)
    const value = parseInt(numbers) || 1
    const gamesPerPerson = Math.max(1, value)
    setRuleset(prev => ({ ...prev, gamesPerPerson }))
  }

  return (
    <>
      <InputLabel className="mb-2" htmlFor={"games-per-person"}>
        Games per person
      </InputLabel>
      <Input
        id={"games-per-person"}
        value={value}
        onChange={setGamesPerPerson}
        placeholder="10"
      />
    </>
  )
}

interface RulesetToggleProps {
  label: string
  name: keyof Ruleset
}

const RulesetToggle = ({ name, label }: RulesetToggleProps) => {
  const [ruleset, setRuleset] = useRuleset()
  const value = ruleset[name]
  const handleChange = (value: boolean) =>
    setRuleset(prev => ({ ...prev, [name]: value }))

  return (
    <label className="flex items-center gap-2">
      <Switch checked={!!value} onCheckedChange={handleChange} />
      {label}
    </label>
  )
}

export const RulesetSettings = () => (
  <Grid.Root>
    <Grid.Item>
      <GamesPerPersonInput />
    </Grid.Item>

    <Grid.Item newLine fullWidth className="flex flex-col gap-2">
      <InputLabel htmlFor="">Duplicates</InputLabel>
      <RulesetToggle label="Allow duplicates" name="allowDuplicates" />
      <RulesetToggle
        label="Allow cross player duplicates"
        name="allowCrossDuplicates"
      />
    </Grid.Item>
  </Grid.Root>
)

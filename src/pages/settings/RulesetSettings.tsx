import { ChangeEvent, useId, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
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
    <label className="flex max-w-max items-center gap-2">
      <Switch checked={!!value} onCheckedChange={handleChange} />
      {label}
    </label>
  )
}

const AdditionalSettings = () => {
  const id = useId()
  const [ruleset, setRuleset] = useRuleset()
  const [value, setValue] = useState(ruleset.additional.join("\n"))

  const handleChange = (value: string) => {
    setValue(value)
    const additional = value.split("\n").filter(Boolean)
    setRuleset(prev => ({ ...prev, additional }))
  }

  return (
    <>
      <InputLabel htmlFor={id}>Additional rules</InputLabel>
      <Textarea
        id={id}
        value={value}
        onChange={({ target }) => handleChange(target.value)}
        className="whitespace-pre"
        lines={Math.max(value.split("\n").length, 3)}
      />
    </>
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

    <Grid.Item newLine fullWidth>
      <AdditionalSettings />
    </Grid.Item>
  </Grid.Root>
)

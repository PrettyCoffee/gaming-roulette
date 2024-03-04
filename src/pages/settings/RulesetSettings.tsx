import { ChangeEvent, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { useRuleset } from "~/data/ruleset"

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

export const RulesetSettings = () => (
  <Grid.Root>
    <Grid.Item>
      <GamesPerPersonInput />
    </Grid.Item>
  </Grid.Root>
)

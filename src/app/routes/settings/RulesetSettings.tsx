import { useId, useState } from "react"

import { InputLabel } from "components/inputs/InputLabel"
import { NumberInput } from "components/inputs/NumberInput"
import { Slider } from "components/inputs/Slider"
import { Switch } from "components/inputs/Switch"
import { Textarea } from "components/inputs/Textarea"
import { calcHandicap } from "data/handicap"
import { Ruleset, useRuleset } from "data/ruleset"
import { createRange } from "utils/array"

import { Grid } from "./Grid"

export const GamesPerPersonInput = () => {
  const [{ gamesPerPerson }, setRuleset] = useRuleset()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={"games-per-person"}>
        Games per person
      </InputLabel>
      <NumberInput
        id={"games-per-person"}
        value={gamesPerPerson}
        onChange={value =>
          setRuleset(prev => ({
            ...prev,
            gamesPerPerson: Math.floor(value ?? 1),
          }))
        }
        placeholder="10"
        unit="games"
        min={1}
        max={99}
      />
    </>
  )
}

const normalize = (value: number, min: number, max: number) => {
  return (value - min) / (max - min)
}

export const HandicapGraph = () => {
  const [{ handicap, gamesPerPerson: items }] = useRuleset()

  const xAxis = 300
  const yAxis = 100
  const points = createRange(items + 1).map(
    i =>
      [
        normalize(i, 0, items) * (xAxis - 4) + 2,
        yAxis - (calcHandicap(i, items, handicap) * (yAxis - 4) + 2),
      ] as const
  )

  return (
    <div className="relative mx-auto h-24 w-max pb-4 pl-4">
      <svg viewBox={`0 0 ${xAxis} ${yAxis}`} className="size-full">
        {points.map(([x, y]) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r={1}
            className="fill-current stroke-white"
          />
        ))}
        <polyline
          points={points.map(([x, y]) => `${x},${y}`).join(" ")}
          className="fill-none stroke-white"
        />
        <polyline
          points={`0,0 0,${yAxis} ${xAxis},${yAxis}`}
          className="fill-none stroke-muted-foreground"
        />
      </svg>
      <div className="absolute bottom-[calc(50%+theme(height.2))] left-2 flex size-0 items-center justify-center">
        <span className="-rotate-90 whitespace-nowrap text-xs text-muted-foreground">
          Handicap
        </span>
      </div>
      <div className="absolute bottom-2 left-[calc(50%+theme(width.2))] flex size-0 items-center justify-center">
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          Games won
        </span>
      </div>
    </div>
  )
}

export const HandicapSlider = () => {
  const [{ handicap }, setRuleset] = useRuleset()

  return (
    <>
      <InputLabel
        className="mb-2"
        htmlFor={"handicap"}
        hint={
          "Defines the severity of the handicap a player will receive after winning multiple times in a row. " +
          "A value of 0 will turn the handicap off. "
        }
      >
        Handicap severity
      </InputLabel>
      <Slider
        id={"handicap"}
        value={[handicap]}
        onValueChange={([value]) => {
          setRuleset(prev => ({
            ...prev,
            handicap: Math.floor((value ?? 1) * 100) / 100,
          }))
        }}
        step={0.05}
        min={0}
        max={3}
      />
      <span className="block text-sm text-muted-foreground">
        {handicap === 0 ? "off" : handicap}
      </span>
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

export const AdditionalRulesInput = () => {
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
      <InputLabel
        htmlFor={id}
        hint={
          "Add any rules here that you want to apply in your gaming roulette. " +
          "These rules won't be enforced."
        }
      >
        Additional rules
      </InputLabel>
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

export const DuplicateRules = () => (
  <div className="flex flex-col gap-2">
    <InputLabel
      htmlFor=""
      hint="Define if one game can be added multiple times to the roulette."
    >
      Duplicates
    </InputLabel>
    <RulesetToggle label="Allow duplicates" name="allowDuplicates" />
    <RulesetToggle
      label="Allow cross player duplicates"
      name="allowCrossDuplicates"
    />
  </div>
)

export const RulesetSettings = () => (
  <Grid.Root>
    <Grid.Item>
      <GamesPerPersonInput />
    </Grid.Item>

    <Grid.Item newLine>
      <HandicapSlider />
    </Grid.Item>
    <Grid.Item className="pt-2">
      <HandicapGraph />
    </Grid.Item>

    <Grid.Item newLine fullWidth>
      <DuplicateRules />
    </Grid.Item>

    <Grid.Item newLine fullWidth>
      <AdditionalRulesInput />
    </Grid.Item>
  </Grid.Root>
)

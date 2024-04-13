import { useState } from "react"

import { Download } from "lucide-react"

import { FileInput } from "~/components/FileInput"
import { Icon } from "~/components/Icon"
import { InputLabel } from "~/components/InputLabel"
import { Modal } from "~/components/Modal"
import { toast } from "~/components/Toaster"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { AudioOptions, audioSettingsAtom } from "~/data/audioSettings"
import { RawGame, gamesAtom } from "~/data/games"
import { Player, playersAtom } from "~/data/players"
import { Ruleset, rulesetAtom } from "~/data/ruleset"
import { GeneralSettings, settingsAtom } from "~/data/settings"
import { today } from "~/utils/date"
import { download } from "~/utils/download"
import { fileToJson } from "~/utils/fileToJson"

import { Grid } from "./Grid"

const dataFields = [
  {
    value: "game-data",
    label: "Game data",
    getValue: () => gamesAtom.get(),
    setValue: (value: unknown) => gamesAtom.set(value as RawGame[]),
    reset: () => gamesAtom.set(gamesAtom.defaultValue),
  },
  {
    value: "preferences",
    label: "Preferences",
    getValue: () => ({
      general: settingsAtom.get(),
      audio: audioSettingsAtom.get(),
    }),
    setValue: (value: unknown) => {
      if (typeof value !== "object" || !value) return
      if ("general" in value) {
        settingsAtom.set(value.general as GeneralSettings)
      }
      if ("audio" in value) {
        audioSettingsAtom.set(value.audio as AudioOptions)
      }
    },
    reset: () => {
      settingsAtom.set(settingsAtom.defaultValue)
      audioSettingsAtom.set(audioSettingsAtom.defaultValue)
    },
  },
  {
    value: "players",
    label: "Players",
    getValue: () => playersAtom.get(),
    setValue: (value: unknown) => playersAtom.set(value as Player[]),
    reset: () => playersAtom.set(playersAtom.defaultValue),
  },
  {
    value: "ruleset",
    label: "Ruleset",
    getValue: () => rulesetAtom.get(),
    setValue: (value: unknown) => rulesetAtom.set(value as Ruleset),
    reset: () => rulesetAtom.set(rulesetAtom.defaultValue),
  },
]

const exportData = (selected: string[]) => {
  const data = selected.reduce<Record<string, unknown>>((result, item) => {
    const field = dataFields.find(field => field.value === item)
    result[item] = field?.getValue()
    return result
  }, {})
  download(data, `gaming-roulette_backup_${today()}.json`)
}

const importData = (selected: string[], data: object) => {
  selected.forEach(item => {
    const field = dataFields.find(field => field.value === item)
    const value = (data as Record<string, unknown>)[item]
    if (field && value) {
      field.setValue(value)
    }
  })
}

export const ImportData = ({
  label,
  selected = dataFields.map(({ value }) => value),
  onChange,
}: {
  label: string
  selected?: string[]
  onChange?: (data: Record<string, unknown>) => void
}) => (
  <FileInput
    variant="ghost"
    label={label}
    accept=".json"
    onChange={file =>
      void fileToJson(file)
        .then(data => {
          if (typeof data !== "object" || !data) {
            throw new Error("Invalid data")
          }
          importData(selected, data)
          onChange?.(data as Record<string, unknown>)
        })
        .then(() => toast({ kind: "success", message: "Import successfull" }))
        .catch(() => toast({ kind: "error", message: "Import failed" }))
    }
  />
)

const ManageData = () => {
  const [selected, setSelected] = useState(dataFields.map(({ value }) => value))
  return (
    <>
      <InputLabel className="mb-0">Import or export data</InputLabel>
      <div className="flex gap-2">
        {dataFields.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={selected.includes(value)}
            onChange={checked =>
              setSelected(state => {
                const newState = state.filter(v => v !== value)
                if (checked) newState.push(value)
                return newState
              })
            }
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <ImportData label="Import settings" selected={selected} />
        <span>- or -</span>
        <Button variant="ghost" onClick={() => exportData(selected)}>
          <Icon icon={Download} />
          Export settings
        </Button>
      </div>
    </>
  )
}

const DeleteData = () => {
  const [deleting, setDeleting] = useState(false)
  return (
    <>
      <InputLabel className="mb-0">Delete data</InputLabel>
      <div>
        <Button variant="destructive" onClick={() => setDeleting(true)}>
          Reset all data
        </Button>
      </div>

      {deleting && (
        <Modal
          open={deleting}
          title="Reset all data"
          description="Do you really want to delete all of your data? This action cannot be undone!"
          confirm={{
            variant: "destructive",
            label: "Delete all data",
            onClick: () => {
              setDeleting(false)
              dataFields.forEach(({ reset }) => reset())
            },
          }}
          cancel={{ label: "Cancel", onClick: () => setDeleting(false) }}
        />
      )}
    </>
  )
}

export const DataSettings = () => (
  <Grid.Root>
    <Grid.Item fullWidth>
      <ManageData />
    </Grid.Item>

    <Grid.Item>
      <DeleteData />
    </Grid.Item>
  </Grid.Root>
)

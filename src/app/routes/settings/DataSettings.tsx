import { Fragment, useState } from "react"

import { Download, Trash } from "lucide-react"

import { Button } from "components/buttons/Button"
import { toast } from "components/feedback/Toaster"
import { Checkbox } from "components/inputs/Checkbox"
import { FileInput } from "components/inputs/FileInput"
import { InputLabel } from "components/inputs/InputLabel"
import { Modal } from "components/overlays/Modal"
import { Icon } from "components/primitives/Icon"
import { Text } from "components/primitives/Text"
import { AudioOptions, audioSettingsAtom } from "data/audioSettings"
import { RawGame, gamesSlice } from "data/games"
import { Player, playersSlice } from "data/players"
import { Ruleset, rulesetAtom } from "data/ruleset"
import { GeneralSettings, settingsAtom } from "data/settings"
import { textColor } from "utils/colors"
import { today } from "utils/date"
import { download } from "utils/download"
import { fileToJson } from "utils/fileToJson"

import { Grid } from "./Grid"

const dataFields = [
  {
    value: "game-data",
    label: "Game data",
    getValue: () => gamesSlice.get(),
    setValue: (value: unknown) => gamesSlice.set(value as RawGame[]),
    reset: () => gamesSlice.set(gamesSlice.defaultValue),
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
    getValue: () => playersSlice.get(),
    setValue: (value: unknown) => playersSlice.set(value as Player[]),
    reset: () => playersSlice.set(playersSlice.defaultValue),
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

const deleteData = (selected: string[]) => {
  selected.forEach(item => {
    const field = dataFields.find(field => field.value === item)
    field?.reset()
  })
}

interface DataButtonProps {
  label: string
  selected?: string[]
}

export const ImportData = ({
  label,
  selected = dataFields.map(({ value }) => value),
  onChange,
}: DataButtonProps & {
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

export const ExportData = ({
  label,
  selected = dataFields.map(({ value }) => value),
}: DataButtonProps) => (
  <Button variant="ghost" onClick={() => exportData(selected)}>
    <Icon icon={Download} />
    {label}
  </Button>
)

export const DeleteData = ({
  label,
  selected = dataFields.map(({ value }) => value),
}: DataButtonProps) => {
  const [deleting, setDeleting] = useState(false)
  const allSelected = selected.length >= dataFields.length
  const affectedData = selected.map(
    value => dataFields.find(field => field.value === value)?.label
  )

  return (
    <>
      <Button variant="destructive" onClick={() => setDeleting(true)}>
        <Icon icon={Trash} color="error" />
        {label}
      </Button>

      {deleting && (
        <Modal
          open={deleting}
          title="Reset selected data"
          description={
            allSelected ? (
              <>
                Do you really want to delete{" "}
                <Text className={textColor({ color: "red" })}>ALL</Text> of your
                data? This action cannot be undone!
              </>
            ) : (
              <>
                Do you really want to delete the selected data? This action
                cannot be undone!
                <br />
                Affected data:{" "}
                {affectedData.map((field, index) => (
                  <Fragment key={field}>
                    {index > 0 && ", "}
                    <Text className={textColor({ color: "red" })}>{field}</Text>
                  </Fragment>
                ))}
              </>
            )
          }
          confirm={{
            variant: "destructive",
            label: "Delete all data",
            onClick: () => {
              setDeleting(false)
              deleteData(selected)
            },
          }}
          cancel={{ label: "Cancel", onClick: () => setDeleting(false) }}
        />
      )}
    </>
  )
}

const ManageData = () => {
  const [selected, setSelected] = useState(dataFields.map(({ value }) => value))
  return (
    <>
      <InputLabel
        hint={
          "Use or create backups of your gaming roulette data. " +
          "Below you can specify which data you want to be affected by the export / import. "
        }
      >
        Manage your data
      </InputLabel>
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
        <ImportData label="Import data" selected={selected} />
        <span>- or -</span>
        <ExportData label="Export data" selected={selected} />
        <span>- or -</span>
        <DeleteData label="Delete data" selected={selected} />
      </div>
    </>
  )
}

export const DataSettings = () => (
  <Grid.Root>
    <Grid.Item fullWidth>
      <ManageData />
    </Grid.Item>
  </Grid.Root>
)

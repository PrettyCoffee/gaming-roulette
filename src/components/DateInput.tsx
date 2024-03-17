import { Dispatch, useState } from "react"

import { Input, InputProps } from "~/components/ui/input"
import { cn } from "~/utils/utils"

const getIsoDate = () => new Date().toISOString().split("T")[0] ?? ""

const dateValidRegex = /^\d{1,4}-\d{1,2}-\d{1,2}$/
const formatSegment = (value: number, length: number) =>
  String(Number.isNaN(value) ? "" : value).padStart(length, "0")

const fixDate = (value: string) => {
  const [year = 0, month = 0, day = 0] = value
    .split("-")
    .map(value => parseInt(value))
  return [
    formatSegment(year, 4),
    formatSegment(month, 2),
    formatSegment(day, 2),
  ].join("-")
}

interface DateInputProps
  extends Omit<InputProps, "placeholder" | "onChange" | "value"> {
  onChange?: Dispatch<string>
  value?: string
}
export const DateInput = ({ onChange, value, ...props }: DateInputProps) => {
  const [internal, setInternal] = useState(value)
  const isValid = dateValidRegex.test(internal ?? "")
  return (
    <Input
      {...props}
      className={cn(
        "w-[calc(10ch+theme(space.5))] max-w-[calc(10ch+theme(space.5))]",
        !isValid && "border-red-500",
        props.className
      )}
      value={internal}
      placeholder={getIsoDate()}
      onChange={({ target }) => {
        setInternal(target.value)
        onChange?.(fixDate(target.value))
      }}
    />
  )
}

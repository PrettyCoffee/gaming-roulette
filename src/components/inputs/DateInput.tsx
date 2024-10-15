import { Dispatch, useState } from "react"

import { Input, InputProps } from "~/components/inputs/Input"
import { today } from "~/utils/date"
import { cn } from "~/utils/utils"

const dateValidRegex = /^\d{1,4}-\d{1,2}-\d{1,2}$/

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

interface SegmentOptions {
  min: number
  max: number
  length: number
}
const formatSegment = (value: number, { length, max, min }: SegmentOptions) =>
  String(clamp(value || 1, min, max)).padStart(length, "0")

const fixDate = (value: string) => {
  const [year = 0, month = 0, day = 0] = value
    .split("-")
    .map(value => parseInt(value))

  return [
    formatSegment(year, { length: 4, min: 1, max: 2999 }),
    formatSegment(month, { length: 2, min: 1, max: 12 }),
    formatSegment(day, { length: 2, min: 1, max: 31 }),
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
      placeholder={today()}
      onChange={({ target }) => {
        setInternal(target.value)
        onChange?.(fixDate(target.value))
      }}
      onBlur={() => setInternal(prev => fixDate(prev ?? ""))}
    />
  )
}

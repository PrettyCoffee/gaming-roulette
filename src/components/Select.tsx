import { Dispatch } from "react"

import * as SelectPrimitive from "./ui/select"

interface SelectOption {
  value: string
  label: string | JSX.Element
}

interface SelectProps {
  id?: string
  value: string
  onChange: Dispatch<string>
  options: SelectOption[]
  placeholder?: string
}

export const Select = ({
  options,
  onChange,
  placeholder,
  ...props
}: SelectProps) => (
  <SelectPrimitive.Root onValueChange={onChange} {...props}>
    <SelectPrimitive.Trigger>
      <SelectPrimitive.Value placeholder={placeholder ?? "Select option"} />
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content>
      {options.map(({ value, label }) => (
        <SelectPrimitive.Item key={value} value={value}>
          {label}
        </SelectPrimitive.Item>
      ))}
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
)

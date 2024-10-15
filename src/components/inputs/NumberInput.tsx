import { Dispatch, useState } from "react"

import { ClassNameProp } from "~/types/BaseProps"
import { parseNumber } from "~/utils/number"
import { cn } from "~/utils/utils"

import { Input } from "./Input"
import { Text } from "../primitives/Text"

const meassureText = (text: string, reference: HTMLElement) => {
  const element = document.createElement("span")
  element.style.font = window.getComputedStyle(reference).font
  element.style.display = "inline"
  element.style.position = "absolute"
  element.style.opacity = "0"
  element.innerHTML = text
  document.body.appendChild(element)
  const width = element.offsetWidth
  document.body.removeChild(element)
  return width
}

interface NumberInputProps extends ClassNameProp {
  value?: number
  onChange?: Dispatch<number | undefined>
  unit?: string
  id?: string
  placeholder?: string
  max?: number
  min?: number
}
export const NumberInput = ({
  value,
  onChange,
  unit,
  className,
  placeholder = "",
  max,
  min,
  ...delegated
}: NumberInputProps) => {
  const [internal, setInternal] = useState(String(value ?? ""))
  const [unitWidth, setUnitWidth] = useState(0)
  const [digitsWidth, setDigitsWidth] = useState(0)

  const handleChange = (value: string) => {
    const { string, number } = parseNumber(value, { min, max })
    setInternal(string)
    onChange?.(number)
  }

  return (
    <div className="relative w-max">
      <Input
        ref={el =>
          el &&
          setDigitsWidth(
            Math.max(meassureText(placeholder, el), meassureText(internal, el))
          )
        }
        {...delegated}
        placeholder={placeholder}
        value={internal}
        onChange={({ target }) => handleChange(target.value)}
        onBlur={() => setInternal(String(value ?? ""))}
        className={cn(
          "w-[calc(var(--digits)+var(--unit-width)+theme(width.4)+theme(width.4))] pr-[calc(var(--unit-width)+theme(width.4))] text-end",
          className
        )}
        style={{
          // @ts-expect-error ts(2353)
          "--unit-width": `${unitWidth}px`,
          "--digits": `${digitsWidth}px`,
        }}
      />
      <Text
        ref={el => el && setUnitWidth(meassureText(unit ?? "", el))}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        color="muted"
        size="sm"
      >
        {unit}
      </Text>
    </div>
  )
}

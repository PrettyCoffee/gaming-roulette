import { Dispatch } from "react"

import { Check } from "lucide-react"

import { focusRing } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { VisuallyHidden } from "./base/VisuallyHidden"
import { Icon } from "./Icon"
import { Popover } from "./ui/popover"

interface ColorButtonProps {
  color: string
  selected: boolean
  onClick: Dispatch<string>
}
const ColorButton = ({ color, selected, onClick }: ColorButtonProps) => (
  <button
    onClick={() => onClick(color)}
    className={cn(
      "w-6 h-6 rounded shadow-sm",
      "inline-flex items-center justify-center",
      "opacity-75 hover:opacity-100 focus-visible:opacity-100",
      `bg-${color}-200`,
      focusRing
    )}
  >
    <VisuallyHidden>{color}</VisuallyHidden>
    {selected && <Icon color="accent" size="sm" icon={Check} />}
  </button>
)

interface ColorPickerProps extends ClassNameProp {
  value: string
  onChange: Dispatch<string>
  colors: string[]
  id?: string
}

export const ColorPicker = ({
  id,
  value,
  colors,
  onChange,
}: ColorPickerProps) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button
        id={id}
        className={cn(
          "w-10 h-10 shrink-0 rounded-md p-1.5 border border-input hover:bg-accent",
          focusRing
        )}
      >
        <div
          className={cn(
            "w-full h-full rounded opacity-75 [*:hover>&]:opacity-100 [*:focus-visible>&]:opacity-100",
            !colors.includes(value)
              ? "bg-muted-foreground/25"
              : `bg-${value}-200`
          )}
        />
        <VisuallyHidden>{value}</VisuallyHidden>
      </button>
    </Popover.Trigger>
    <Popover.Content asChild>
      <div className="w-max grid grid-cols-4 justify-center gap-1">
        {colors.map(color => (
          <ColorButton
            key={color}
            color={color}
            selected={color === value}
            onClick={onChange}
          />
        ))}
      </div>
    </Popover.Content>
  </Popover.Root>
)

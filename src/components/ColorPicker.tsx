import { Dispatch } from "react"

import { Check } from "lucide-react"

import { focusRing } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { BaseButton } from "./base/BaseButton"
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
  <Popover.Close asChild>
    <BaseButton
      onClick={() => onClick(color)}
      className={cn(
        "size-6 rounded shadow-sm",
        "inline-flex items-center justify-center",
        "opacity-75 hover:opacity-100 focus-visible:opacity-100",
        "relative before:absolute before:-inset-0.5 before:block",
        `bg-${color}-200`,
        focusRing
      )}
    >
      <VisuallyHidden>{color}</VisuallyHidden>
      {selected && <Icon color="accent" size="sm" icon={Check} />}
    </BaseButton>
  </Popover.Close>
)

interface ColorPickerProps extends ClassNameProp {
  value: string
  onChange: Dispatch<string>
  colors: string[] | readonly string[]
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
      <BaseButton
        id={id}
        className={cn(
          "size-10 shrink-0 rounded-md border border-input p-1.5 hover:bg-accent",
          focusRing
        )}
      >
        <div
          className={cn(
            "size-full rounded opacity-75 [*:focus-visible>&]:opacity-100 [*:hover>&]:opacity-100",
            !colors.includes(value)
              ? "bg-muted-foreground/25"
              : `bg-${value}-200`
          )}
        />
        <VisuallyHidden>{value}</VisuallyHidden>
      </BaseButton>
    </Popover.Trigger>
    <Popover.Content asChild>
      <div className="grid w-max grid-cols-4 justify-center gap-1">
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

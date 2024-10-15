import { Dispatch } from "react"

import { Check } from "lucide-react"

import { ClassNameProp } from "~/types/BaseProps"
import { ColorValue } from "~/utils/colors"
import { focusRing } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { BaseButton } from "../buttons/BaseButton"
import { Icon } from "../primitives/Icon"
import { Swatch } from "../primitives/Swatch"
import { Popover } from "../ui/popover"
import { VisuallyHidden } from "../utility/VisuallyHidden"

interface ColorButtonProps {
  color: ColorValue
  selected: boolean
  onClick: Dispatch<ColorValue>
}
const ColorButton = ({ color, selected, onClick }: ColorButtonProps) => (
  <Popover.Close asChild>
    <Swatch color={color} size="md" asChild>
      <BaseButton
        onClick={() => onClick(color)}
        className={cn(
          "relative opacity-75 before:absolute before:-inset-0.5 before:block hover:opacity-100 focus-visible:opacity-100",
          focusRing
        )}
      >
        <VisuallyHidden>{color}</VisuallyHidden>
        {selected && <Icon color="accent" size="sm" icon={Check} />}
      </BaseButton>
    </Swatch>
  </Popover.Close>
)

interface ColorPickerProps extends ClassNameProp {
  value: ColorValue
  onChange: Dispatch<ColorValue>
  colors: ColorValue[] | readonly ColorValue[]
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
        <Swatch
          color={value}
          size="full"
          className="opacity-75 [*:focus-visible>&]:opacity-100 [*:hover>&]:opacity-100"
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

import * as React from "react"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "utils/utils"

const Box = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="size-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Box.displayName = CheckboxPrimitive.Root.displayName

interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: React.Dispatch<boolean>
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="inline-flex h-10 cursor-pointer select-none items-center gap-2 rounded-md pl-3 pr-4 hover:bg-alt">
    <Box checked={checked} onClick={() => onChange?.(!checked)} />
    {label}
  </label>
)

export { Checkbox }
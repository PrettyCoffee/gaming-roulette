import { PropsWithChildren, forwardRef } from "react"

import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"

import { AsChildProp, ClassNameProp } from "types/BaseProps"
import { ColorValue, bgColor } from "utils/colors"
import { cn } from "utils/utils"

const swatch = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "size-4 rounded-sm",
      md: "size-6 rounded",
      lg: "size-8 rounded",
      full: "size-full rounded-[15%]",
    },
  },
  defaultVariants: { size: "md" },
})

interface SwatchProps
  extends AsChildProp,
    ClassNameProp,
    VariantProps<typeof swatch> {
  color: ColorValue
}

export const Swatch = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SwatchProps>
>(({ className, asChild, size, color, ...props }, ref) => {
  const Comp = asChild ? Slot : "span"
  return (
    <Comp
      ref={ref}
      className={cn(swatch({ size }), bgColor({ color }), className)}
      {...props}
    />
  )
})
Swatch.displayName = "Swatch"

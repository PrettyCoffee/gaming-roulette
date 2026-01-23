import { forwardRef } from "react"

import { VariantProps, cva } from "class-variance-authority"
import { LucideIcon, LucideProps } from "lucide-react"

import { ClassNameProp } from "types/BaseProps"
import { cn } from "utils/utils"

const icon = cva("inline-block shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-8",
    },
    color: {
      default: "text-foreground",
      current: "text-current",
      accent: "text-accent",
      muted: "text-muted-foreground",
      error: "text-red-400",
    },
    filled: {
      true: "fill-current",
      false: "",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
})

export interface IconProp {
  icon: LucideIcon
}

export type IconProps = IconProp &
  ClassNameProp &
  VariantProps<typeof icon> &
  Pick<LucideProps, "strokeWidth">

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { icon: Icon, className, strokeWidth, color, filled, size, ...delegated },
    ref
  ) => (
    <Icon
      ref={ref}
      className={cn(icon({ color, filled, size }), className)}
      absoluteStrokeWidth={strokeWidth == null}
      strokeWidth={(strokeWidth ?? size === "xs") ? 3 : undefined}
      {...delegated}
    />
  )
)
Icon.displayName = "Icon"

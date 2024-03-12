import { VariantProps, cva } from "class-variance-authority"
import { LucideIcon, LucideProps } from "lucide-react"

import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"

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

export const Icon = ({
  icon: Icon,
  className,
  strokeWidth,
  ...styles
}: IconProps) => (
  <Icon
    className={cn(icon(styles), className)}
    absoluteStrokeWidth={strokeWidth == null}
    strokeWidth={strokeWidth ?? styles.size === "xs" ? 3 : undefined}
  />
)

import { PropsWithChildren } from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { colorGradient, ColorGradient, colors } from "~/utils/colors"
import { cn } from "~/utils/utils"

import { AsChildProp, ClassNameProp } from "./BaseProps"

const text = cva("text-foreground", {
  variants: {
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      inherit: "text-inherit",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    bold: {
      true: "font-bold",
    },
    noWrap: {
      true: "whitespace-nowrap",
    },
    noOverflow: {
      true: "overflow-hidden text-ellipsis",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    bold: false,
  },
})

const getGradientEnd = (color: ColorGradient["from"]) => {
  const index = colors.findIndex(c => c === color)
  return colors[(index + 2) % colors.length] ?? color
}
const getGradient = ({ from, to: toProp }: TextProps["gradient"] = {}) => {
  if (!from) return ""
  const to = toProp ?? getGradientEnd(from)
  return colorGradient({ text: true, from, to })
}

interface TextProps
  extends AsChildProp,
    ClassNameProp,
    VariantProps<typeof text> {
  gradient?: Partial<Pick<ColorGradient, "from" | "to">>
}

export const Text = ({
  asChild,
  children,
  className,
  gradient,
  ...styles
}: PropsWithChildren<TextProps>) => {
  const Comp = asChild ? Slot : "span"
  return (
    <Comp className={cn(text(styles), getGradient(gradient), className)}>
      {children}
    </Comp>
  )
}

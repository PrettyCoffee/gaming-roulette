import { PropsWithChildren } from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { colors } from "~/utils/colors"
import { cn } from "~/utils/utils"

import { AsChildProp, ClassNameProp } from "./BaseProps"

const text = cva("text-foreground", {
  variants: {
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      inherit: "text-inherit",
      red: "text-red-300",
      orange: "text-orange-300",
      amber: "text-amber-300",
      yellow: "text-yellow-300",
      lime: "text-lime-300",
      green: "text-green-300",
      emerald: "text-emerald-300",
      teal: "text-teal-300",
      cyan: "text-cyan-300",
      sky: "text-sky-300",
      blue: "text-blue-300",
      indigo: "text-indigo-300",
      violet: "text-violet-300",
      purple: "text-purple-300",
      fuchsia: "text-fuchsia-300",
      pink: "text-pink-300",
      rose: "text-rose-300",
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

const getGradientEnd = (color: string) => {
  const index = colors.findIndex(c => c === color)
  return colors[(index + 2) % colors.length] ?? color
}
const getGradient = ({
  from,
  to: toProp,
}: { from?: string; to?: string } = {}) => {
  if (!from) return {}
  const to = toProp ?? getGradientEnd(from)
  return {
    className: `bg-clip-text bg-gradient-to-r from-${from}-300 to-${to}-300`,
    style: {
      WebkitTextFillColor: "transparent",
    },
  }
}

interface TextProps
  extends AsChildProp,
    ClassNameProp,
    VariantProps<typeof text> {
  gradient?: {
    from: (typeof colors)[number]
    to?: (typeof colors)[number]
  }
}

export const Text = ({
  asChild,
  children,
  className,
  gradient,
  ...styles
}: PropsWithChildren<TextProps>) => {
  const Comp = asChild ? Slot : "span"
  const gradientStyles = getGradient(gradient)
  return (
    <Comp
      className={cn(text(styles), gradientStyles.className, className)}
      style={gradientStyles.style}
    >
      {children}
    </Comp>
  )
}

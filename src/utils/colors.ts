import { VariantProps, cva } from "class-variance-authority"

export const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  // "cyan", removed for cosmetic reasons (16 vs 17 colors)
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const

export const color200: Record<string, string> = {
  red: "#fecaca",
  orange: "#fed7aa",
  amber: "#fde68a",
  yellow: "#fef08a",
  lime: "#d9f99d",
  green: "#bbf7d0",
  emerald: "#a7f3d0",
  teal: "#99f6e4",
  cyan: "#a5f3fc",
  sky: "#bae6fd",
  blue: "#bfdbfe",
  indigo: "#c7d2fe",
  violet: "#ddd6fe",
  purple: "#e9d5ff",
  fuchsia: "#f5d0fe",
  pink: "#fbcfe8",
  rose: "#fecdd3",
}

export const bgColor = cva("", {
  variants: {
    color: {
      red: "bg-red-200",
      orange: "bg-orange-200",
      amber: "bg-amber-200",
      yellow: "bg-yellow-200",
      lime: "bg-lime-200",
      green: "bg-green-200",
      emerald: "bg-emerald-200",
      teal: "bg-teal-200",
      sky: "bg-sky-200",
      blue: "bg-blue-200",
      indigo: "bg-indigo-200",
      violet: "bg-violet-200",
      purple: "bg-purple-200",
      fuchsia: "bg-fuchsia-200",
      pink: "bg-pink-200",
      rose: "bg-rose-200",
    },
  },
})
export type ColorProp = VariantProps<typeof bgColor>
export type ColorValue = NonNullable<ColorProp["color"]>

export const textColor = cva("", {
  variants: {
    color: {
      red: "text-red-200",
      orange: "text-orange-200",
      amber: "text-amber-200",
      yellow: "text-yellow-200",
      lime: "text-lime-200",
      green: "text-green-200",
      emerald: "text-emerald-200",
      teal: "text-teal-200",
      sky: "text-sky-200",
      blue: "text-blue-200",
      indigo: "text-indigo-200",
      violet: "text-violet-200",
      purple: "text-purple-200",
      fuchsia: "text-fuchsia-200",
      pink: "text-pink-200",
      rose: "text-rose-200",
    },
  },
})

export const borderColor = cva("border", {
  variants: {
    color: {
      red: "border-red-200",
      orange: "border-orange-200",
      amber: "border-amber-200",
      yellow: "border-yellow-200",
      lime: "border-lime-200",
      green: "border-green-200",
      emerald: "border-emerald-200",
      teal: "border-teal-200",
      sky: "border-sky-200",
      blue: "border-blue-200",
      indigo: "border-indigo-200",
      violet: "border-violet-200",
      purple: "border-purple-200",
      fuchsia: "border-fuchsia-200",
      pink: "border-pink-200",
      rose: "border-rose-200",
    },
  },
})

export const textColorDark = cva("", {
  variants: {
    color: {
      red: "text-red-950",
      orange: "text-orange-950",
      amber: "text-amber-950",
      yellow: "text-yellow-950",
      lime: "text-lime-950",
      green: "text-green-950",
      emerald: "text-emerald-950",
      teal: "text-teal-950",
      sky: "text-sky-950",
      blue: "text-blue-950",
      indigo: "text-indigo-950",
      violet: "text-violet-950",
      purple: "text-purple-950",
      fuchsia: "text-fuchsia-950",
      pink: "text-pink-950",
      rose: "text-rose-950",
    },
  },
})

export const colorGradient = cva("!text-transparent", {
  variants: {
    text: {
      true: "bg-clip-text",
    },
    direction: {
      right: "bg-gradient-to-r",
      left: "bg-gradient-to-l",
      top: "bg-gradient-to-t",
      bottom: "bg-gradient-to-b",
    },
    from: {
      red: "from-red-300",
      orange: "from-orange-300",
      amber: "from-amber-300",
      yellow: "from-yellow-300",
      lime: "from-lime-300",
      green: "from-green-300",
      emerald: "from-emerald-300",
      teal: "from-teal-300",
      sky: "from-sky-300",
      blue: "from-blue-300",
      indigo: "from-indigo-300",
      violet: "from-violet-300",
      purple: "from-purple-300",
      fuchsia: "from-fuchsia-300",
      pink: "from-pink-300",
      rose: "from-rose-300",
    },
    to: {
      red: "to-red-300",
      orange: "to-orange-300",
      amber: "to-amber-300",
      yellow: "to-yellow-300",
      lime: "to-lime-300",
      green: "to-green-300",
      emerald: "to-emerald-300",
      teal: "to-teal-300",
      sky: "to-sky-300",
      blue: "to-blue-300",
      indigo: "to-indigo-300",
      violet: "to-violet-300",
      purple: "to-purple-300",
      fuchsia: "to-fuchsia-300",
      pink: "to-pink-300",
      rose: "to-rose-300",
    },
  },
  defaultVariants: {
    text: false,
    direction: "right",
  },
})
export type ColorGradient = VariantProps<typeof colorGradient>

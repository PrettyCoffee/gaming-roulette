import { cva, VariantProps } from "class-variance-authority"
import { Copy } from "lucide-react"

import { ClassNameProp } from "types/BaseProps"
import { cn } from "utils/utils"

import { Icon } from "../primitives/Icon"

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

const iconPosition = cva(
  "absolute inline-flex items-center justify-center rounded-sm bg-base/25 backdrop-blur-sm [button:not(:hover)>&]:hidden",
  {
    variants: {
      size: {
        md: "right-0.5 top-0.5 size-6 rounded-sm",
        lg: "right-1 top-1 size-8 rounded-md",
      },
    },
  }
)

interface CopyClickProps
  extends ClassNameProp,
    VariantProps<typeof iconPosition> {
  text: string
}

export const CopyClick = ({ text, className, size }: CopyClickProps) => {
  return (
    <button
      className={cn(
        "absolute inset-0 size-full hover:bg-base/10 active:bg-base/20",
        className
      )}
      onClick={() => void copyToClipboard(text)}
    >
      <span className={cn(iconPosition({ size }))}>
        <Icon icon={Copy} size={size === "lg" ? "sm" : "xs"} color="default" />
      </span>
    </button>
  )
}

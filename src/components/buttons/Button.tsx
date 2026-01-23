import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { focusRing } from "utils/styles"
import { cn } from "utils/utils"

import { BaseButton, BaseButtonProps } from "./BaseButton"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 truncate rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ],
  {
    variants: {
      variant: {
        key: "bg-zinc-700/50 text-accent-foreground hover:bg-zinc-700/75",
        destructive:
          "border border-red-400 bg-red-400/5 text-red-400 hover:bg-red-400/15",
        ghost:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        flat: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        md: "h-10 shrink-0 px-4",
        sm: "h-8 px-3",
      },
    },
    defaultVariants: {
      variant: "key",
      size: "md",
    },
  }
)

export type ButtonProps = BaseButtonProps & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <BaseButton
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }

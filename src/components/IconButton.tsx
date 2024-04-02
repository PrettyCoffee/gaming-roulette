import { forwardRef } from "react"

import { cva, VariantProps } from "class-variance-authority"

import { Button, ButtonProps } from "~/components/ui/button"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { VisuallyHidden } from "./base/VisuallyHidden"
import { Icon, IconProps } from "./Icon"
import { TitleTooltip, TitleTooltipProps } from "./TitleTooltip"

const iconButton = cva("shrink-0", {
  variants: {
    size: {
      md: "size-10",
      sm: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface IconButtonProps
  extends ClassNameProp,
    Pick<IconProps, "icon" | "filled">,
    VariantProps<typeof iconButton>,
    Pick<ButtonProps, "onClick" | "variant" | "disabled" | "muteAudio"> {
  title: string
  titleSide?: TitleTooltipProps["side"]
  hideTitle?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      filled,
      title,
      onClick,
      titleSide,
      hideTitle,
      variant = "flat",
      size = "md",
      className,
      ...delegated
    },
    ref
  ) => (
    <TitleTooltip
      title={hideTitle ? undefined : title}
      side={titleSide}
      asChild
    >
      <Button
        ref={ref}
        variant={variant}
        onClick={onClick}
        className={cn(iconButton({ size }), className)}
        {...delegated}
      >
        <VisuallyHidden>{title}</VisuallyHidden>
        <Icon icon={icon} size={size} color="current" filled={filled} />
      </Button>
    </TitleTooltip>
  )
)
IconButton.displayName = "IconButton"

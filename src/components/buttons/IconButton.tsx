import { forwardRef } from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { Button, type ButtonProps } from "components/buttons/Button"
import { type ClassNameProp } from "types/BaseProps"
import { cn } from "utils/utils"

import { TitleTooltip, type TitleTooltipProps } from "../feedback/TitleTooltip"
import { Icon, type IconProps } from "../primitives/Icon"
import { VisuallyHidden } from "../utility/VisuallyHidden"

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
  extends
    ClassNameProp,
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

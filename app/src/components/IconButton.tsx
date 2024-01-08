import { forwardRef } from "react"

import { Button, ButtonProps } from "~/components/ui/button"

import { ClassNameProp } from "./base/BaseProps"
import { VisuallyHidden } from "./base/VisuallyHidden"
import { Icon, IconProp } from "./Icon"
import { TitleTooltip, TitleTooltipProps } from "./TitleTooltip"

export interface IconButtonProps
  extends ClassNameProp,
    IconProp,
    Pick<ButtonProps, "onClick" | "variant" | "disabled"> {
  title: string
  titleSide?: TitleTooltipProps["side"]
  hideTitle?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      title,
      onClick,
      titleSide,
      hideTitle,
      variant = "ghost",
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
        size="icon"
        onClick={onClick}
        {...delegated}
      >
        <VisuallyHidden>{title}</VisuallyHidden>
        <Icon icon={icon} size="md" color="current" />
      </Button>
    </TitleTooltip>
  )
)
IconButton.displayName = "IconButton"
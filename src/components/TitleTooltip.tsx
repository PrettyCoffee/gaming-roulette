import * as React from "react"

import { TooltipContentProps } from "@radix-ui/react-tooltip"

import { AsChildProp, DisabledProp, TitleProp } from "./base/BaseProps"
import { Tooltip } from "./ui/tooltip"

export interface TitleTooltipProps
  extends TitleProp,
    AsChildProp,
    DisabledProp {
  side?: TooltipContentProps["side"]
}

export const TitleTooltip = ({
  title,
  asChild,
  side,
  children,
  disabled,
}: React.PropsWithChildren<TitleTooltipProps>) =>
  !title || disabled ? (
    children
  ) : (
    <Tooltip.Root disableHoverableContent>
      <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={side}>{title}</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )

import * as React from "react"

import { TooltipContentProps } from "@radix-ui/react-tooltip"

import { AsChildProp, DisabledProp, TitleProp } from "types/BaseProps"

import { Tooltip } from "./Tooltip"

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
    <Tooltip.Root disableHoverableContent delayDuration={300}>
      <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={side} className="max-w-64">
          {title}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )

import * as React from "react"

import { TooltipContentProps } from "@radix-ui/react-tooltip"

import { AsChildProp, TitleProp } from "./base/BaseProps"
import { Tooltip } from "./ui/tooltip"

export interface TitleTooltipProps extends TitleProp, AsChildProp {
  side?: TooltipContentProps["side"]
}

export const TitleTooltip = ({
  title,
  asChild,
  side,
  children,
}: React.PropsWithChildren<TitleTooltipProps>) =>
  !title ? (
    children
  ) : (
    <Tooltip.Root>
      <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side={side}>{title}</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )

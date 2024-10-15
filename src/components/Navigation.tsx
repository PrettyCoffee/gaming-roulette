import { Dispatch } from "react"

import { cva } from "class-variance-authority"

import { Route } from "~/pages/routes"
import { ClassNameProp } from "~/types/BaseProps"
import { focusRing, noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { BaseButton } from "./buttons/BaseButton"
import { Icon } from "./primitives/Icon"
import { TitleTooltip } from "./TitleTooltip"

const navButton = cva(
  cn(
    "relative inline-flex items-center rounded-sm text-sm font-medium text-foreground",
    "before:absolute before:bottom-1.5 before:h-0.5 before:rounded-full before:bg-blue-200/50 before:transition-all",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
    noOverflow
  ),
  {
    variants: {
      compact: {
        true: "size-10 justify-center p-0",
        false: "h-8 w-32 justify-start px-2",
      },
      active: {
        true: "cursor-default bg-background shadow-sm before:w-4",
        false: "before:w-0 hover:bg-background hover:before:w-2",
      },
    },
    defaultVariants: {
      compact: false,
      active: false,
    },
  }
)

interface NavButtonProps
  extends Pick<Route, "disabled" | "label" | "icon">,
    ClassNameProp {
  active: boolean
  onClick: () => void
  compact?: boolean
}

const NavButton = ({
  active,
  className,
  label,
  compact,
  icon,
  onClick,
  disabled,
}: NavButtonProps) => (
  <TitleTooltip asChild title={label} disabled={!compact} side="right">
    <BaseButton
      onMouseDown={onClick}
      muteAudio={active}
      disabled={disabled}
      className={cn(navButton({ active, compact }), className)}
    >
      {compact ? <Icon icon={icon} /> : label}
    </BaseButton>
  </TitleTooltip>
)

interface NavigationProps {
  items: Route[]
  value?: string
  compact?: boolean
  onClick: Dispatch<string>
}

export const Navigation = ({
  items: routes,
  value,
  onClick,
  compact,
}: NavigationProps) => {
  return (
    <nav>
      <ul className="flex flex-col items-stretch gap-1">
        {routes.map(route => (
          <TitleTooltip
            key={route.value}
            asChild
            title={route.hint}
            side="right"
          >
            <li key={route.value}>
              <NavButton
                active={route.value === value}
                onClick={() => onClick(route.value)}
                compact={compact}
                {...route}
              />
            </li>
          </TitleTooltip>
        ))}
      </ul>
    </nav>
  )
}

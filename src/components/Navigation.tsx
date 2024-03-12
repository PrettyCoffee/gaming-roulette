import { Dispatch } from "react"

import { cva } from "class-variance-authority"

import { Route } from "~/pages/routes"
import { focusRing, noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { BaseButton } from "./base/BaseButton"
import { ClassNameProp } from "./base/BaseProps"
import { Icon } from "./Icon"
import { TitleTooltip } from "./TitleTooltip"

const navButton = cva(
  cn(
    "relative inline-flex items-center rounded-sm text-foreground text-sm font-medium",
    "before:absolute before:h-0.5 before:bottom-1.5 before:bg-blue-200/50 before:rounded-full before:transition-all",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
    noOverflow
  ),
  {
    variants: {
      compact: {
        true: "p-0 h-10 w-10 justify-center",
        false: "px-2 h-8 w-32 justify-start",
      },
      active: {
        true: "bg-background shadow-sm cursor-default before:w-4",
        false: "hover:bg-background before:w-0 hover:before:w-2",
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

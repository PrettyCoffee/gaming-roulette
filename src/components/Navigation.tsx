import { Dispatch } from "react"

import { Route } from "~/pages/routes"
import { cn } from "~/utils/utils"

import { BaseButton } from "./base/BaseButton"
import { ClassNameProp } from "./base/BaseProps"
import { Icon } from "./Icon"
import { TitleTooltip } from "./TitleTooltip"

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
      className={cn(
        "inline-flex items-center h-8 px-2 w-full rounded-sm transition-all",
        compact && "p-0 h-10 w-10 justify-center",
        "whitespace-nowrap text-left text-sm font-medium",
        "disabled:pointer-events-none disabled:opacity-50",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        !active && "hover:bg-background/50",
        active && "bg-background text-foreground shadow-sm cursor-default",
        className
      )}
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

import { Dispatch } from "react"

import { Route } from "~/pages/routes"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { TitleTooltip } from "./TitleTooltip"

interface NavButtonProps
  extends Pick<Route, "disabled" | "label">,
    ClassNameProp {
  active: boolean
  onClick: () => void
}

const NavButton = ({
  active,
  className,
  label,
  ...delegated
}: NavButtonProps) => (
  <button
    className={cn(
      "px-3 py-1.5 w-full rounded-sm transition-all",
      "whitespace-nowrap text-left text-sm font-medium",
      "disabled:pointer-events-none disabled:opacity-50",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      !active && "hover:bg-background/50",
      active && "bg-background text-foreground shadow-sm",
      className
    )}
    {...delegated}
  >
    {label}
  </button>
)

interface NavigationProps {
  items: Route[]
  value?: string
  onClick: Dispatch<string>
}

export const Navigation = ({
  items: routes,
  value,
  onClick,
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
                {...route}
              />
            </li>
          </TitleTooltip>
        ))}
      </ul>
    </nav>
  )
}

import { Dispatch, PropsWithChildren } from "react"

import { cn } from "~/utils/utils"

import { ClassNameProp, DisabledProp } from "./base/BaseProps"

interface NavButtonProps extends ClassNameProp, DisabledProp {
  active: boolean
  onClick: () => void
}

const NavButton = ({
  active,
  className,
  ...delegated
}: PropsWithChildren<NavButtonProps>) => (
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
  />
)

interface NavItem extends DisabledProp {
  label: string
  value: string
}

interface NavigationProps {
  items: NavItem[]
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
          <li key={route.value}>
            <NavButton
              active={route.value === value}
              onClick={() => onClick(route.value)}
              disabled={route.disabled}
            >
              {route.label}
            </NavButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}

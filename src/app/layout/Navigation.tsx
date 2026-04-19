import { cva } from "class-variance-authority"
import { createLucideIcon } from "lucide-react"

import { routes } from "app/routes/Router"
import { BaseButton } from "components/buttons/BaseButton"
import { TitleTooltip } from "components/feedback/TitleTooltip"
import { Icon } from "components/primitives/Icon"
import { Link } from "components/primitives/Link"
import { setHashRoute, useHashRoute } from "components/utility/hash-router"
import { onGithubMouseDown } from "data/github"
import { useSettings } from "data/settings"
import { ClassNameProp } from "types/BaseProps"
import { RouteMeta } from "types/routes"
import { focusRing, noOverflow } from "utils/styles"
import { cn } from "utils/utils"

const GithubIcon = createLucideIcon("Github", [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
      key: "1",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2", key: "2" }],
])

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

interface NavButtonProps extends RouteMeta, ClassNameProp {
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
}: NavButtonProps) => (
  <TitleTooltip asChild title={label} disabled={!compact} side="right">
    <BaseButton
      onMouseDown={onClick}
      muteAudio={active}
      className={cn(navButton({ active, compact }), className)}
    >
      {compact ? <Icon icon={icon} /> : label}
    </BaseButton>
  </TitleTooltip>
)

export const Navigation = ({ className }: ClassNameProp) => {
  const path = useHashRoute()
  const [{ compactNavigation }] = useSettings()

  return (
    <nav className={cn("flex h-full flex-col", className)}>
      <ul className="flex flex-1 flex-col items-stretch gap-1">
        {routes.map(route => (
          <li key={route.path}>
            <NavButton
              active={route.path === path}
              onClick={() => setHashRoute(route.path)}
              compact={compactNavigation}
              icon={route.meta.icon}
              label={route.meta.label}
            />
          </li>
        ))}
      </ul>

      <Link
        onMouseDown={onGithubMouseDown}
        href="https://github.com/PrettyCoffee/gaming-roulette"
        target="_blank"
        className={cn(
          "px-2 py-1 text-sm",
          compactNavigation && "w-full justify-center"
        )}
      >
        <Icon icon={GithubIcon} size="sm" />
        {!compactNavigation && "Github"}
      </Link>
    </nav>
  )
}

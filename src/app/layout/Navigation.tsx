import { cva } from "class-variance-authority"
import { Github } from "lucide-react"

import { BaseButton } from "~/components/buttons/BaseButton"
import { TitleTooltip } from "~/components/feedback/TitleTooltip"
import { Icon } from "~/components/primitives/Icon"
import { Link } from "~/components/primitives/Link"
import { setHashRoute, useHashRoute } from "~/components/utility/hash-router"
import { onGithubMouseDown } from "~/data/github"
import { useSettings } from "~/data/settings"
import { routes } from "~/pages/Router"
import { ClassNameProp } from "~/types/BaseProps"
import { RouteMeta } from "~/types/routes"
import { focusRing, noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

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
        <Icon icon={Github} size="sm" />
        {!compactNavigation && "Github"}
      </Link>
    </nav>
  )
}

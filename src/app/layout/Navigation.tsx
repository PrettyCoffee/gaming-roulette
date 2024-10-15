import { cva } from "class-variance-authority"
import { Github } from "lucide-react"

import { BaseButton } from "~/components/buttons/BaseButton"
import { TitleTooltip } from "~/components/feedback/TitleTooltip"
import { Icon } from "~/components/primitives/Icon"
import { Link } from "~/components/primitives/Link"
import { onGithubMouseDown } from "~/data/github"
import { useSettings } from "~/data/settings"
import { useHashRouter } from "~/hooks/useHashRouter"
import { Route, routes } from "~/pages/Router"
import { ClassNameProp } from "~/types/BaseProps"
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

export const Navigation = ({ className }: ClassNameProp) => {
  const [current, setCurrent] = useHashRouter({ fallback: routes[0], routes })
  const [{ compactNavigation }] = useSettings()

  return (
    <nav className={cn("flex h-full flex-col", className)}>
      <ul className="flex flex-1 flex-col items-stretch gap-1">
        {routes.map(route => (
          <TitleTooltip
            key={route.value}
            asChild
            title={route.hint}
            side="right"
          >
            <li key={route.value}>
              <NavButton
                active={route.value === current}
                onClick={() => setCurrent(route.value)}
                compact={compactNavigation}
                {...route}
              />
            </li>
          </TitleTooltip>
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

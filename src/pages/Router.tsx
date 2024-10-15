import { lazy } from "react"

import {
  Dices,
  LucideIcon,
  Settings as SettingsIcon,
  Gamepad,
  GanttChartSquare,
  Home as HomeIcon,
} from "lucide-react"

import { useHashRouter } from "~/hooks/useHashRouter"

export interface Route {
  label: string
  value: string
  component: React.ComponentType
  icon: LucideIcon
  disabled?: boolean
  hint?: string
}

export const routes: Route[] = [
  {
    label: "Start",
    value: "start",
    icon: HomeIcon,
    component: lazy(() => import("./home/Home")),
  },
  {
    label: "Current Games",
    value: "current-games",
    icon: Gamepad,
    component: lazy(() => import("./current/Current")),
  },
  {
    label: "Game Picker",
    value: "game-picker",
    icon: Dices,
    component: lazy(() => import("./spinner/Spinner")),
  },
  {
    label: "Overview",
    value: "overview",
    icon: GanttChartSquare,
    component: lazy(() => import("./overview/Overview")),
  },
  {
    label: "Settings",
    value: "settings",
    icon: SettingsIcon,
    component: lazy(() => import("./settings/Settings")),
  },
]

export const Router = () => {
  const [current] = useHashRouter({ fallback: routes[0], routes })

  const currentRoute = routes.find(({ value }) => value === current)
  const ActiveView = currentRoute?.component ?? (() => null)

  return (
    <>
      <h1 className="sr-only">{currentRoute?.label}</h1>
      <ActiveView />
    </>
  )
}

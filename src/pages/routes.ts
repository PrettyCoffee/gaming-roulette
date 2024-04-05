import { lazy } from "react"

import {
  Dices,
  LucideIcon,
  Settings as SettingsIcon,
  Gamepad,
  GanttChartSquare,
  Home as HomeIcon,
} from "lucide-react"

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

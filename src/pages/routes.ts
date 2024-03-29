import {
  Dices,
  LucideIcon,
  Settings as SettingsIcon,
  Gamepad,
  GanttChartSquare,
  Home as HomeIcon,
} from "lucide-react"

import { Current } from "./current/Current"
import { Home } from "./home/Home"
import { Overview } from "./overview/Overview"
import { Settings } from "./settings/Settings"
import { Spinner } from "./spinner/Spinner"

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
    component: Home,
  },
  {
    label: "Current Games",
    value: "current-games",
    icon: Gamepad,
    component: Current,
  },
  {
    label: "Game Picker",
    value: "game-picker",
    icon: Dices,
    component: Spinner,
  },
  {
    label: "Overview",
    value: "overview",
    component: Overview,
    icon: GanttChartSquare,
  },
  {
    label: "Settings",
    value: "settings",
    icon: SettingsIcon,
    component: Settings,
  },
]

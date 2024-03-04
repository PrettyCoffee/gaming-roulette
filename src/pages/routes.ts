import {
  Dices,
  LucideIcon,
  Settings as SettingsIcon,
  Gamepad,
  GanttChartSquare,
} from "lucide-react"

import { Current } from "./current/Current"
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
    disabled: true,
    hint: "Github settings missing",
  },
  {
    label: "Settings",
    value: "settings",
    icon: SettingsIcon,
    component: Settings,
  },
]
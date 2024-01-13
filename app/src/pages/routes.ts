import { Current } from "./current/Current"
import { Overview } from "./overview/Overview"
import { Settings } from "./settings/Settings"
import { Spinner } from "./spinner/Spinner"

export interface Route {
  label: string
  value: string
  component: React.ComponentType
  disabled?: boolean
  hint?: string
}

export const routes: Route[] = [
  {
    label: "Current Games",
    value: "current-games",
    component: Current,
  },
  {
    label: "Game Picker",
    value: "game-picker",
    component: Spinner,
  },
  {
    label: "Overview",
    value: "overview",
    component: Overview,
    disabled: true,
    hint: "Github settings missing",
  },
  {
    label: "Settings",
    value: "settings",
    component: Settings,
  },
]

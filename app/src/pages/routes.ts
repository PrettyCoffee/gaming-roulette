import { Current } from "./current/Current"
import { Overview } from "./overview/Overview"
import { Settings } from "./settings/Settings"
import { Spinner } from "./spinner/Spinner"

export const routes = [
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
  },
  {
    label: "Settings",
    value: "settings",
    component: Settings,
    disabled: false,
  },
]

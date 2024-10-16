import { lazy } from "react"

import {
  Dices,
  Settings as SettingsIcon,
  Gamepad,
  GanttChartSquare,
  Home as HomeIcon,
} from "lucide-react"

import {
  createRoutes,
  HashRouter,
  useHashRoute,
} from "~/components/utility/hash-router"

export const routes = createRoutes([
  {
    path: "",
    Component: lazy(() => import("./home/Home")),
    meta: { label: "Start", icon: HomeIcon },
  },
  {
    path: "current-games",
    Component: lazy(() => import("./current/Current")),
    meta: { label: "Current Games", icon: Gamepad },
  },
  {
    path: "game-picker",
    Component: lazy(() => import("./spinner/Spinner")),
    meta: { label: "Game Picker", icon: Dices },
  },
  {
    path: "overview",
    Component: lazy(() => import("./overview/Overview")),
    meta: { label: "Overview", icon: GanttChartSquare },
  },
  {
    path: "settings",
    Component: lazy(() => import("./settings/Settings")),
    meta: { label: "Settings", icon: SettingsIcon },
  },
])

export const Router = () => {
  const current = useHashRoute()
  const currentRoute = routes.find(({ path }) => path === current)

  return (
    <>
      <h1 className="sr-only">{currentRoute?.meta.label}</h1>
      <HashRouter routes={routes} />
    </>
  )
}

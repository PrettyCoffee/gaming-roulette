import { useMemo } from "react"

import { useHashRoute } from "./hashRouterAtom"
import { LazyOrFunctionComponent, Route } from "./types"

const removeEndSlash = (path: string) => path.replace(/\/$/, "")
const isExactMatch = (matcher: string, path: string) =>
  removeEndSlash(matcher) === removeEndSlash(path)

export const matchPath = (matcher: string, path: string) =>
  isExactMatch(matcher, path)

const useCurrentRoute = (routes: Route[]) => {
  const path = useHashRoute()

  return useMemo(
    () =>
      routes.reduce<Route | null>((match, item) => {
        if (match) return match
        return matchPath(item.path, path) ? item : null
      }, null),
    [path, routes]
  )
}

interface HashRouterProps {
  routes: Route[]
  Fallback?: LazyOrFunctionComponent
}

export const HashRouter = ({ routes, Fallback }: HashRouterProps) => {
  const match = useCurrentRoute(routes)
  return match ? <match.Component /> : Fallback ? <Fallback /> : null
}

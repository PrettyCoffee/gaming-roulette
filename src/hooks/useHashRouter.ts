import { useCallback, useEffect, useState } from "react"

import { Route } from "~/pages/routes"

interface HashRouterProps {
  routes: Route[]
  fallback?: Route
}
export const useHashRouter = ({ fallback, routes }: HashRouterProps) => {
  const [current, setCurrent] = useState<string>()

  const setRoute = useCallback(
    (value: string) => {
      const route =
        routes.find(({ value: routeValue }) => routeValue === value) ?? fallback
      if (!route) return
      setCurrent(route.value)
      window.location.hash = route.value
    },
    [fallback, routes]
  )

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      const route = routes.find(({ value }) => value === hash) ?? fallback
      if (!route) return
      setCurrent(route.value)
    }
    window.addEventListener("hashchange", handleHashChange)
    handleHashChange()
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [fallback, routes])

  return [current, setRoute] as const
}

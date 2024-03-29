import { useEffect, useState } from "react"

import { css } from "goober"
import { Github } from "lucide-react"

import { ErrorBoundary } from "~/components/ErrorBoundary"
import { Icon } from "~/components/Icon"
import { Link } from "~/components/Link"
import { Navigation } from "~/components/Navigation"
import { usePlayers } from "~/data/players"
import { useSettings } from "~/data/settings"
import { useHashRouter } from "~/hooks/useHashRouter"
import { cn } from "~/utils/utils"

import { Init } from "./init/Init"
import { routes } from "./routes"

const layout = css`
  display: grid;
  grid-template-areas:
    "navigation main"
    "footer main";
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
`

const navigation = css`
  grid-area: navigation;
`

const main = css`
  grid-area: main;
`

const footer = css`
  grid-area: footer;
  align-self: end;
`

const ErrorFallback = () => (
  <div className="flex size-full flex-col items-center justify-center">
    <div>💥KABOOM💥</div>
    <div className="text-sm text-muted-foreground">
      Something went terribly wrong and everything is burning now.
    </div>
  </div>
)

export const Pages = () => {
  const [current, setCurrent] = useHashRouter({ fallback: routes[0], routes })
  const [{ compactNavigation }] = useSettings()

  const { players } = usePlayers()
  const [showInit, setShowInit] = useState(players.length < 1)

  useEffect(() => {
    if (!showInit && players.length < 1) {
      setShowInit(true)
    }
  }, [showInit, players.length])

  if (showInit) {
    return <Init onFinish={() => setShowInit(false)} />
  }

  const currentRoute = routes.find(({ value }) => value === current)
  const ActiveView = currentRoute?.component ?? (() => null)

  return (
    <div className={cn("h-full flex-1 overflow-hidden", layout)}>
      <nav className={cn("-my-2 p-2", navigation)}>
        <Navigation
          items={routes}
          value={current}
          onClick={setCurrent}
          compact={compactNavigation}
        />
      </nav>
      <main
        className={cn(
          "m-2 ml-0 mt-0 overflow-auto rounded-lg bg-background p-4 shadow-lg",
          main
        )}
      >
        <h1 className="sr-only">{currentRoute?.label}</h1>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ActiveView />
        </ErrorBoundary>
      </main>
      <footer className={cn("flex flex-col px-2 pb-2", footer)}>
        <Link
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
      </footer>
    </div>
  )
}

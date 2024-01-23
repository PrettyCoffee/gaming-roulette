import { useEffect, useState } from "react"

import styled from "@emotion/styled"
import { appWindow } from "@tauri-apps/api/window"
import { Github } from "lucide-react"

import { ErrorBoundary } from "./components/ErrorBoundary"
import { Icon } from "./components/Icon"
import { Link } from "./components/Link"
import { Navigation } from "./components/Navigation"
import { WindowTitlebar } from "./components/WindowTitlebar"
import { useGithub } from "./data/github"
import { useSettings } from "./data/settings"
import { routes } from "./pages/routes"
import { cn } from "./utils/utils"

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "navigation main"
    "footer main";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
`

const NavigationContent = styled.nav`
  grid-area: navigation;
`

const MainContent = styled.main`
  grid-area: main;
`

const FooterContent = styled.footer`
  grid-area: footer;
  align-self: end;
`

const ErrorFallback = () => (
  <div className="h-full w-full flex flex-col items-center justify-center">
    <div>💥KABOOM💥</div>
    <div className="text-sm text-muted-foreground">
      Something went terribly wrong and everything is burning now.
    </div>
  </div>
)

const useWindowFocus = () => {
  useEffect(() => {
    void appWindow.onFocusChanged(({ payload: active }) => {
      if (active) {
        document.documentElement.removeAttribute("data-window-inactive")
      } else {
        document.documentElement.setAttribute("data-window-inactive", "")
      }
    })
  }, [])
}

export const App = () => {
  useWindowFocus()
  const [current, setCurrent] = useState(routes[0]?.value)
  const [{ compactNavigation }] = useSettings()
  const { token, filePath, repoName, repoOwner } = useGithub()

  const currentRoute = routes.find(({ value }) => value === current)
  const ActiveView = currentRoute?.component ?? (() => null)

  const hasAllGithubOptions = token && filePath && repoName && repoOwner
  const enabledRoutes = routes.map(route =>
    route.value === "overview" && hasAllGithubOptions
      ? { ...route, disabled: false, hint: undefined }
      : route
  )

  return (
    <div className="max-h-screen h-full overflow-hidden flex flex-col">
      <WindowTitlebar>
        <img
          src="/logo.svg"
          alt="Gaming Roulette"
          className={cn(
            "transition-all ml-3 w-6 h-6 select-none pointer-events-none"
          )}
        />
        <span className="pl-3 text-muted-foreground text-sm font-bold select-none pointer-events-none">
          Gaming Roulette
        </span>
      </WindowTitlebar>
      <Layout className="flex-1 h-full overflow-hidden">
        <NavigationContent
          className={cn(
            "transition-all -my-2 p-2",
            compactNavigation ? "w-13" : "w-40 px-4"
          )}
        >
          <Navigation
            items={enabledRoutes}
            value={current}
            onClick={setCurrent}
            compact={compactNavigation}
          />
        </NavigationContent>
        <MainContent className="m-2 mt-0 ml-0 p-4 bg-background rounded-lg shadow-lg overflow-auto">
          <h1 className="sr-only">{currentRoute?.label}</h1>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <ActiveView />
          </ErrorBoundary>
        </MainContent>
        <FooterContent className="flex flex-col pl-2 pb-2">
          <Link
            href="https://github.com/PrettyCoffee/gaming-roulette"
            target="_blank"
            className={cn("text-sm inline-block pl-3 py-1")}
          >
            <Icon icon={Github} size="sm" className="mr-1" />
            {!compactNavigation && "Github"}
          </Link>
        </FooterContent>
      </Layout>
    </div>
  )
}

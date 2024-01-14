import { useState } from "react"

import styled from "@emotion/styled"
import { Github } from "lucide-react"

import { Icon } from "./components/Icon"
import { Link } from "./components/Link"
import { Navigation } from "./components/Navigation"
import { useGithub } from "./data/github"
import { useSettings } from "./data/settings"
import { routes } from "./pages/routes"
import { cn } from "./utils/utils"

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "logo main"
    "navigation main"
    "footer main";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
`

const LogoContent = styled.div`
  grid-area: logo;
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

export const App = () => {
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
    <Layout className="h-full p-2 pl-4 gap-4">
      <LogoContent>
        <img
          src="/logo.svg"
          alt="Gaming Roulette"
          className={cn(
            "pt-2 mx-auto transition-all",
            compactNavigation ? "w-6" : "w-12"
          )}
        />
      </LogoContent>
      <NavigationContent
        className={cn(
          "p-2 -m-2 transition-all overflow-hidden",
          compactNavigation ? "w-14" : "w-32"
        )}
      >
        <Navigation
          items={enabledRoutes}
          value={current}
          onClick={setCurrent}
          compact={compactNavigation}
        />
      </NavigationContent>
      <MainContent className="p-4 bg-background rounded-lg shadow-lg overflow-auto">
        <h1 className="sr-only">{currentRoute?.label}</h1>
        <ActiveView />
      </MainContent>
      <FooterContent className="p-2 flex flex-col">
        <Link
          href="https://github.com/PrettyCoffee/gaming-roulette"
          target="_blank"
          className={cn(
            "text-sm inline-block",
            compactNavigation && " w-full text-center"
          )}
        >
          <Icon icon={Github} size="sm" />
          {!compactNavigation && "Github"}
        </Link>
      </FooterContent>
    </Layout>
  )
}

import styled from "@emotion/styled";
import { routes } from "./pages/routes";
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Link } from "./components/Link";
import { Github } from "lucide-react";
import { Icon } from "./components/Icon";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "logo main"
    "navigation main"
    "footer main";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
`;

const LogoContent = styled.div`
  grid-area: logo;
`;

const NavigationContent = styled.nav`
  grid-area: navigation;
`;

const MainContent = styled.main`
  grid-area: main;
`;

const FooterContent = styled.footer`
  grid-area: footer;
  align-self: end;
`;

export const App = () => {
  const [current, setCurrent] = useState(routes[0]?.value)

  const ActiveView = routes.find(({ value }) => value === current)?.component ?? (() => null)
  
  return (
    <Layout className="h-full p-2 pl-4 gap-4 [&>*]:overflow-auto">
      <LogoContent>
        <img src="/logo.svg" alt="Gaming Roulette" className="pt-2 w-12 mx-auto" />
      </LogoContent>
      <NavigationContent className="p-2 -m-2 min-w-[theme(width.32)]">
        <Navigation items={routes} value={current} onClick={setCurrent} />
      </NavigationContent>
      <MainContent className="p-4 bg-background rounded-lg shadow-lg">
        <ActiveView />
      </MainContent>
      <FooterContent className="p-2">
        <Link href="https://github.com/PrettyCoffee/gaming-roulette" target="_blank" className="text-sm">
          <Icon icon={Github} size="sm"/>
          Github
        </Link>
      </FooterContent>
    </Layout>
  );
}

import { BrowserContainer } from "./BrowserContainer"
import { IdleIndicator } from "./components/IdleIndicator"
import { Pages } from "./pages/Pages"
import { TauriContainer } from "./TauriContainer"
import { isTauriEnv } from "./utils/isTauriEnv"

export const App = () => {
  const Container = isTauriEnv() ? TauriContainer : BrowserContainer

  return (
    <Container>
      <Pages />
      <IdleIndicator />
    </Container>
  )
}

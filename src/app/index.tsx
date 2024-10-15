import { IdleIndicator } from "~/components/IdleIndicator"
import { Pages } from "~/pages/Pages"

import { AppLayout } from "./Layout"
import { AppProviders } from "./Providers"

export const App = () => {
  return (
    <AppProviders>
      <AppLayout>
        <Pages />
        <IdleIndicator />
      </AppLayout>
    </AppProviders>
  )
}

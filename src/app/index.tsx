import { IdleIndicator } from "~/components/feedback/IdleIndicator"
import { Router } from "~/pages/Router"

import { AppLayout } from "./layout/Layout"
import { AppProviders } from "./Providers"

export const App = () => {
  return (
    <AppProviders>
      <AppLayout>
        <Router />
        <IdleIndicator />
      </AppLayout>
    </AppProviders>
  )
}

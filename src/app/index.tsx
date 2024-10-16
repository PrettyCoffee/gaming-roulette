import { Router } from "~/app/routes/Router"
import { IdleIndicator } from "~/components/feedback/IdleIndicator"

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

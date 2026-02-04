import { PropsWithChildren, Suspense, useEffect, useState } from "react"

import { css } from "goober"

import { Navigation } from "app/layout/Navigation"
import { Loading } from "components/feedback/Loading"
import { ErrorBoundary } from "components/utility/ErrorBoundary"
import { usePlayers } from "data/players"
import { cn } from "utils/utils"

import { WindowTitlebar } from "./WindowTitlebar"
import { Init } from "../routes/init/Init"

const layout = css`
  display: grid;
  grid-template-areas:
    "titlebar titlebar"
    "navigation main";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
`

const titlebar = css`
  grid-area: titlebar;
`

const navigation = css`
  grid-area: navigation;
`

const main = css`
  grid-area: main;
`

export const AppShell = ({ children }: PropsWithChildren) => {
  const { players } = usePlayers()
  const [showInit, setShowInit] = useState(players.length === 0)

  useEffect(() => {
    if (!showInit && players.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- legacy code, fix when actively working on this
      setShowInit(true)
    }
  }, [showInit, players.length])

  if (showInit) {
    return (
      <div className="flex h-full flex-col">
        <WindowTitlebar className={titlebar} />
        <Init onFinish={() => setShowInit(false)} />
      </div>
    )
  }

  return (
    <div className={cn("h-full", layout)}>
      <WindowTitlebar className={titlebar} />
      <Navigation className={cn("p-2 pt-0", navigation)} />
      <main
        className={cn(
          "m-2 ml-0 mt-0 flex items-center justify-center overflow-auto rounded-lg bg-background p-4 shadow-lg",
          main
        )}
      >
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}

import { PropsWithChildren } from "react"

import { WindowTitlebar } from "./components/WindowTitlebar"

export const BrowserContainer = ({ children }: PropsWithChildren) => (
  <div className="flex h-full items-center justify-center overflow-hidden bg-black p-2">
    <div className="flex size-full max-h-[50rem] max-w-[75rem] flex-col rounded-lg border bg-base">
      <WindowTitlebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  </div>
)

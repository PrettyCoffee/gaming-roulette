import { PropsWithChildren } from "react"

import { WindowTitlebar } from "./components/WindowTitlebar"

export const BrowserContainer = ({ children }: PropsWithChildren) => (
  <div className="p-2 h-full overflow-hidden flex items-center justify-center bg-black">
    <div className="flex flex-col max-h-[25rem] h-full max-w-[50rem] w-full rounded-lg border bg-base">
      <WindowTitlebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  </div>
)

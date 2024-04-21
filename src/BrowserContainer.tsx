import { PropsWithChildren } from "react"

import { WindowTitlebar } from "./components/WindowTitlebar"
import { useWindowSize } from "./data/window"
import { cn } from "./utils/utils"

export const BrowserContainer = ({ children }: PropsWithChildren) => {
  const size = useWindowSize()
  return (
    <div className="flex h-full items-center justify-center overflow-hidden bg-black p-2">
      <div
        className={cn(
          "flex size-full max-h-[50rem] max-w-[75rem] flex-col rounded-lg border bg-base transition-all",
          size === "static" &&
            "max-h-[25rem] min-h-[25rem] min-w-[50rem] max-w-[50rem]"
        )}
      >
        <WindowTitlebar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

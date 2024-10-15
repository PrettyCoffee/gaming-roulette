import { PropsWithChildren } from "react"

import { WindowTitlebar } from "~/components/WindowTitlebar"
import { useWindowSize } from "~/data/window"
import { useWindowFocus } from "~/hooks/useWindowFocus"
import { isTauriEnv } from "~/utils/isTauriEnv"
import { cn } from "~/utils/utils"

const TauriLayout = ({ children }: PropsWithChildren) => {
  const isFocused = useWindowFocus()
  return (
    <div
      className={cn(
        "flex h-full max-h-screen flex-col overflow-hidden rounded-lg border bg-base",
        "transition-[filter] duration-300",
        !isFocused && "bg-base brightness-75 grayscale-[0.25]"
      )}
    >
      <WindowTitlebar />
      {children}
    </div>
  )
}

const BrowserLayout = ({ children }: PropsWithChildren) => {
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

export const AppLayout = isTauriEnv() ? TauriLayout : BrowserLayout

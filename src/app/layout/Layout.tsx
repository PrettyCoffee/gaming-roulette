import { PropsWithChildren } from "react"

import { useWindowSize } from "~/data/window"
import { useWindowFocus } from "~/hooks/useWindowFocus"
import { isTauriEnv } from "~/utils/isTauriEnv"
import { cn } from "~/utils/utils"

import { AppShell } from "./AppShell"

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
      <AppShell>{children}</AppShell>
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
        <AppShell>{children}</AppShell>
      </div>
    </div>
  )
}

export const AppLayout = isTauriEnv() ? TauriLayout : BrowserLayout

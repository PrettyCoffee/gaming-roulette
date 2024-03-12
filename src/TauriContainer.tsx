import { PropsWithChildren } from "react"

import { WindowTitlebar } from "./components/WindowTitlebar"
import { useWindowFocus } from "./hooks/useWindowFocus"
import { cn } from "./utils/utils"

export const TauriContainer = ({ children }: PropsWithChildren) => {
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

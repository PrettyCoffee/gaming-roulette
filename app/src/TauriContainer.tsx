import { PropsWithChildren } from "react"

import { WindowTitlebar } from "./components/WindowTitlebar"
import { useWindowFocus } from "./hooks/useWindowFocus"
import { cn } from "./utils/utils"

export const TauriContainer = ({ children }: PropsWithChildren) => {
  const isFocused = useWindowFocus()
  return (
    <div
      className={cn(
        "max-h-screen h-full overflow-hidden flex flex-col rounded-lg bg-base border",
        !isFocused && "bg-background"
      )}
    >
      <WindowTitlebar />
      {children}
    </div>
  )
}

import { PropsWithChildren, useState, useEffect } from "react"

import { appWindow } from "@tauri-apps/api/window"
import { Copy, Minus, Square, X } from "lucide-react"

import { IconButton } from "./IconButton"

const useIsMaximized = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const updateIsMaximized = async () => {
      const resolvedPromise = await appWindow.isMaximized()
      setIsMaximized(resolvedPromise)
    }

    let unlisten: () => void = () => null
    const listen = async () => {
      unlisten = await appWindow.onResized(() => {
        void updateIsMaximized()
      })
    }

    void updateIsMaximized()
    void listen()

    return () => unlisten()
  }, [])

  return isMaximized
}

export const WindowTitlebar = ({ children }: PropsWithChildren) => {
  const isMaximized = useIsMaximized()

  return (
    <div data-tauri-drag-region className="flex items-center p-2">
      {children}

      <div className="ml-auto">
        <IconButton
          icon={Minus}
          title="Minimize"
          size="sm"
          onClick={() => void appWindow.minimize()}
        />
        {isMaximized ? (
          <IconButton
            icon={Copy}
            title="Shrink"
            size="sm"
            onClick={() => void appWindow.unmaximize()}
          />
        ) : (
          <IconButton
            icon={Square}
            title="Maximize"
            size="sm"
            onClick={() => void appWindow.maximize()}
          />
        )}
        <IconButton
          icon={X}
          title="Close"
          size="sm"
          onClick={() => void appWindow.close()}
        />
      </div>
    </div>
  )
}

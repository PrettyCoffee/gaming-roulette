import { appWindow } from "@tauri-apps/api/window"
import { Maximize2, Minimize2, Minus, Volume2, VolumeX, X } from "lucide-react"

import { useAudioSettings } from "~/data/audioSettings"
import { useWindowSize, windowAtom } from "~/data/window"
import { isTauriEnv } from "~/utils/isTauriEnv"
import { cn } from "~/utils/utils"

import { IconButton } from "./buttons/IconButton"

/* Window is currently not resizable
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


const isMaximized = useIsMaximized()

isMaximized ? (
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
)
*/

const WindowActions = () => {
  const [{ muted }, setAudioSettings] = useAudioSettings()
  const windowSize = useWindowSize()

  return (
    <div className="ml-auto">
      <IconButton
        icon={muted ? VolumeX : Volume2}
        title="Mute audio"
        size="sm"
        onClick={() =>
          setAudioSettings(prev => ({ ...prev, muted: !prev.muted }))
        }
      />
      {!isTauriEnv() && (
        <IconButton
          icon={windowSize === "static" ? Maximize2 : Minimize2}
          title={windowSize === "static" ? "Maximize" : "Minimize"}
          size="sm"
          onClick={() =>
            windowAtom.set(prev => ({
              size: prev.size === "static" ? "fluid" : "static",
            }))
          }
        />
      )}
      {isTauriEnv() && (
        <>
          <IconButton
            icon={Minus}
            title="Minimize"
            size="sm"
            onClick={() => void appWindow.minimize()}
          />
          <IconButton
            icon={X}
            title="Close"
            size="sm"
            onClick={() => void appWindow.close()}
          />
        </>
      )}
    </div>
  )
}

export const WindowTitlebar = () => {
  return (
    <div
      data-tauri-drag-region
      className="relative z-20 flex h-12 items-center p-2"
    >
      <img
        src="./logo.svg"
        alt="Gaming Roulette"
        className={cn(
          "pointer-events-none ml-3 size-6 select-none transition-all"
        )}
      />
      <span className="pointer-events-none select-none pl-3 text-sm font-bold text-muted-foreground">
        Gaming Roulette
      </span>

      <WindowActions />
    </div>
  )
}

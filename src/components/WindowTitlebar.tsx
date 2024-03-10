import { appWindow } from "@tauri-apps/api/window"
import { Minus, Volume2, VolumeX, X } from "lucide-react"

import { useAudioSettings } from "~/data/audioSettings"
import { isTauriEnv } from "~/utils/isTauriEnv"
import { cn } from "~/utils/utils"

import { IconButton } from "./IconButton"

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
      className="flex items-center h-12 p-2 relative z-[999]"
    >
      <img
        src="/logo.svg"
        alt="Gaming Roulette"
        className={cn(
          "transition-all ml-3 w-6 h-6 select-none pointer-events-none"
        )}
      />
      <span className="pl-3 text-muted-foreground text-sm font-bold select-none pointer-events-none">
        Gaming Roulette
      </span>

      <WindowActions />
    </div>
  )
}

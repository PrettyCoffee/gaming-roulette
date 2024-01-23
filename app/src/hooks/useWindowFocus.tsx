import { useEffect } from "react"

import { appWindow } from "@tauri-apps/api/window"

export const useWindowFocus = () => {
  useEffect(() => {
    void appWindow.onFocusChanged(({ payload: active }) => {
      if (active) {
        document.documentElement.removeAttribute("data-window-inactive")
      } else {
        document.documentElement.setAttribute("data-window-inactive", "")
      }
    })
  }, [])
}

import { useEffect, useState } from "react"

import { appWindow } from "@tauri-apps/api/window"

export const useWindowFocus = () => {
  const [isFocused, setIsFocused] = useState(true)
  useEffect(() => {
    void appWindow.onFocusChanged(({ payload: active }) => {
      setIsFocused(active)
      if (active) {
        document.documentElement.removeAttribute("data-window-inactive")
      } else {
        document.documentElement.setAttribute("data-window-inactive", "")
      }
    })
  }, [])
  return isFocused
}

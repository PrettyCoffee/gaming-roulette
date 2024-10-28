import { useEffect, useState } from "react"

import { appWindow } from "@tauri-apps/api/window"

import { isTauriEnv } from "utils/isTauriEnv"

export const useWindowFocus = () => {
  const [isFocused, setIsFocused] = useState(true)
  useEffect(() => {
    if (!isTauriEnv()) return

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

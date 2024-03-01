import { useEffect, useRef, useState } from "react"

export const useMouseIdle = (timeout = 3000) => {
  const [isIdle, setIsIdle] = useState(false)
  const cleanup = useRef<() => void>(() => null)

  useEffect(() => {
    cleanup.current()

    let timer: number
    const handleMouseMove = () => {
      setIsIdle(false)
      clearTimeout(timer)
      timer = window.setTimeout(() => setIsIdle(true), timeout)
    }

    window.addEventListener("mousemove", handleMouseMove)

    cleanup.current = () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }

    return () => cleanup.current()
  }, [timeout])

  return isIdle
}

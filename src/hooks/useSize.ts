import { useEffect, useState } from "react"

export const useSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return size
}

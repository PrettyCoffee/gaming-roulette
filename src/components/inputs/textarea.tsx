import * as React from "react"

import { getFontSize } from "utils/getFontSize"
import { cn } from "utils/utils"

const getLineHeight = (element: HTMLElement): number => {
  const rem = getFontSize()
  const fontSize = getFontSize(element)
  const lineHeight = getComputedStyle(element).lineHeight

  const value = /(\d+\.?\d*)/.exec(lineHeight)?.[1]
  const unit = lineHeight.replace(value ?? "", "")

  const fallback = fontSize * 1.3 // some random fallback with no meaning
  if (value == null) return fallback

  switch (unit) {
    case "px":
      return Number.parseFloat(value)
    case "rem":
      return Number.parseFloat(value) * rem
    case "em":
    case "":
      return Number.parseFloat(value) * fontSize
    default:
      return fallback
  }
}

const getYPadding = (element: HTMLElement) => {
  const { paddingTop, paddingBottom } = getComputedStyle(element)
  return Number.parseFloat(paddingTop) + Number.parseFloat(paddingBottom)
}

const getYBorder = (element: HTMLElement) => {
  const { borderTopWidth, borderBottomWidth } = getComputedStyle(element)
  return (
    Number.parseFloat(borderTopWidth) + Number.parseFloat(borderBottomWidth)
  )
}

const combineRefs =
  <T,>(...refs: React.Ref<T>[]): React.LegacyRef<T> =>
  (element: T) => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(element)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = element
      }
    })
  }

interface ClampedHeightProps {
  lines?: number
}
const useClampedHeight = ({ lines }: ClampedHeightProps) => {
  const [ref, setRef] = React.useState<HTMLTextAreaElement | null>(null)

  const height = React.useMemo(() => {
    const element = ref
    if (element == null || !lines) return undefined
    const lineHeight = getLineHeight(element)
    const padding = getYPadding(element)
    const border = getYBorder(element)
    const height = lines * lineHeight + padding + border
    return `${height}px`
  }, [lines, ref])

  return { ref: (element: HTMLTextAreaElement) => setRef(element), height }
}

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { lines?: number }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, lines, ...props }, forwardedRef) => {
    const { ref, height } = useClampedHeight({ lines })

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={combineRefs(ref, forwardedRef)}
        {...props}
        style={{ height, ...props.style }}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

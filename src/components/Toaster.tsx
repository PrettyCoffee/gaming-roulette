import { keyframes } from "goober"
import {
  BadgeCheck,
  BadgeInfo,
  OctagonAlert,
  TriangleAlert,
  Undo2,
  X,
} from "lucide-react"

import { createAtom, useAtomValue } from "~/lib/yaasl"
import { bgColor, textColor } from "~/utils/colors"
import { createId } from "~/utils/createId"
import { cn } from "~/utils/utils"

import { IconButton } from "./buttons/IconButton"
import { Icon } from "./primitives/Icon"
import { Portal } from "./utility/Portal"

const kinds = {
  info: { color: "blue", icon: BadgeInfo, duration: 5000 },
  success: { color: "green", icon: BadgeCheck, duration: 5000 },
  warning: { color: "yellow", icon: TriangleAlert, duration: 0 },
  error: { color: "red", icon: OctagonAlert, duration: 0 },
} as const

interface ToastProps {
  kind: "info" | "success" | "warning" | "error"
  message: string
  duration?: number
  undo?: () => void
}

interface ToastState extends ToastProps {
  id: string
}

const toastsAtom = createAtom<ToastState[]>({
  name: "toasts",
  defaultValue: [],
})

const removeToast = (id: string) => {
  toastsAtom.set(toasts => toasts.filter(toast => toast.id !== id))
}

export const toast = ({
  kind,
  duration = kinds[kind].duration,
  ...props
}: ToastProps) => {
  const id = createId()
  toastsAtom.set(toasts => [...toasts, { id, kind, duration, ...props }])

  if (duration < 1) return
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

const shrink = keyframes`
  0% {
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.125rem;
  }
  100% {
    left: 100%;
    right: 0.5rem;
    bottom: 0.125rem;
  }
`

const Toast = ({ id, kind, message, duration, undo }: ToastState) => {
  const { color, icon } = kinds[kind]

  return (
    <div className="relative flex w-64 items-center rounded-md bg-base p-1 pl-2 shadow-medium">
      <Icon icon={icon} className={cn(textColor({ color }))} />
      <span className="mx-2 flex-1 truncate">{message}</span>
      {undo && (
        <IconButton
          icon={Undo2}
          size="sm"
          title="Undo"
          hideTitle
          onClick={() => {
            undo()
            removeToast(id)
          }}
        />
      )}
      <IconButton
        icon={X}
        size="sm"
        title="Close"
        hideTitle
        onClick={() => removeToast(id)}
      />
      <span
        className={cn(bgColor({ color }), "absolute h-0.5 rounded")}
        style={{
          animation: `${shrink} ${duration ?? 0}ms linear forwards`,
        }}
      />
    </div>
  )
}

export const Toaster = () => {
  const toasts = useAtomValue(toastsAtom)

  return (
    <Portal>
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-1 pb-4 pl-2 pr-4 pt-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </Portal>
  )
}

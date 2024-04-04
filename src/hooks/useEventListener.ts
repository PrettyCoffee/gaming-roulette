import { useEffect, useRef } from "react"

type ElementType = HTMLElement | Window | Document | null
type EventMap<Type extends ElementType> = Type extends HTMLElement
  ? HTMLElementEventMap
  : Type extends Window
  ? WindowEventMap
  : DocumentEventMap

interface UseEventListenerProps<
  Type extends ElementType,
  EventName extends keyof EventMap<Type>
> {
  ref: Type
  event: EventName
  handler: (e: EventMap<Type>[EventName]) => void
  disabled?: boolean
}

export const useEventListener = <
  Type extends ElementType,
  EventName extends keyof EventMap<Type>
>({
  ref,
  event,
  handler,
  disabled,
}: UseEventListenerProps<Type, EventName>) => {
  const clear = useRef<() => void>(() => null)
  const lastHandler = useRef(handler)
  lastHandler.current = handler

  useEffect(() => {
    clear.current()
    if (disabled || !ref) return

    const emit = (e: EventMap<Type>[EventName]) => lastHandler.current(e)

    ref.addEventListener(
      event as string,
      emit as EventListenerOrEventListenerObject
    )
    clear.current = () => {
      ref.removeEventListener(
        event as string,
        emit as EventListenerOrEventListenerObject
      )
    }
    return () => clear.current()
  }, [disabled, event, ref])
}

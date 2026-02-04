import { RefObject, useEffect, useRef } from "react"

type ElementType = HTMLElement | Window | Document | null
type EventMap<Type extends ElementType> = Type extends HTMLElement
  ? HTMLElementEventMap
  : Type extends Window
    ? WindowEventMap
    : DocumentEventMap

interface UseEventListenerProps<
  Type extends ElementType,
  EventName extends keyof EventMap<Type>,
> {
  ref: RefObject<Type>
  event: EventName
  handler: (e: EventMap<Type>[EventName]) => void
  disabled?: boolean
}

export const useEventListener = <
  Type extends ElementType,
  EventName extends keyof EventMap<Type>,
>({
  ref,
  event,
  handler,
  disabled,
}: UseEventListenerProps<Type, EventName>) => {
  const lastHandler = useRef(handler)

  useEffect(() => {
    lastHandler.current = handler
  })

  useEffect(() => {
    const element = ref.current
    if (disabled || !element) return

    const emit = (e: EventMap<Type>[EventName]) => lastHandler.current(e)

    element.addEventListener(
      event as string,
      emit as EventListenerOrEventListenerObject
    )
    return () => {
      element.removeEventListener(
        event as string,
        emit as EventListenerOrEventListenerObject
      )
    }
  }, [disabled, event, ref])
}

import { forwardRef, MouseEvent, FocusEvent } from "react"

import { Slot } from "@radix-ui/react-slot"

import click from "~/assets/btn-click.mp3"
import hover from "~/assets/btn-hover.mp3"
import { audioSettingsAtom } from "~/data/audioSettings"
import { playAudio } from "~/utils/playAudio"

import { AsChildProp } from "./BaseProps"

type ButtonMouseEvent = MouseEvent<HTMLButtonElement>
type ButtonFocusEvent = FocusEvent<HTMLButtonElement>

interface PlayButtonSoundProps {
  e: ButtonMouseEvent | ButtonFocusEvent
  sound: "click" | "hover"
  muteAudio: BaseButtonProps["muteAudio"]
}
const playButtonSound = ({ e, sound, muteAudio }: PlayButtonSoundProps) => {
  const shouldPlay =
    muteAudio == null
      ? true
      : typeof muteAudio === "function"
      ? !muteAudio(e)
      : !muteAudio

  if (!shouldPlay) return

  const url = sound === "click" ? click : hover
  const playbackRate = sound === "hover" ? 1.5 : undefined
  if (sound === "hover") {
    // Disable hover sounds for now
    return
  }
  playAudio(url, {
    volume: audioSettingsAtom.get().buttonVolume,
    playbackRate,
  })
}

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProp & {
    muteAudio?: ((e: ButtonMouseEvent | ButtonFocusEvent) => boolean) | boolean
  }

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      asChild = false,
      onMouseEnter,
      onMouseDown,
      muteAudio,
      onFocus,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        onMouseDown={e => {
          playButtonSound({
            sound: "click",
            muteAudio,
            e: e as ButtonMouseEvent,
          })
          onMouseDown?.(e as ButtonMouseEvent)
        }}
        onMouseEnter={e => {
          playButtonSound({
            sound: "hover",
            muteAudio,
            e: e as ButtonMouseEvent,
          })
          onMouseEnter?.(e as ButtonMouseEvent)
        }}
        onFocus={e => {
          playButtonSound({
            sound: "hover",
            muteAudio,
            e: e as ButtonFocusEvent,
          })
          onFocus?.(e as ButtonFocusEvent)
        }}
        {...props}
      />
    )
  }
)
BaseButton.displayName = "BaseButton"

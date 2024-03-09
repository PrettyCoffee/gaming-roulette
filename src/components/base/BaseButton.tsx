import { forwardRef, MouseEvent } from "react"

import { Slot } from "@radix-ui/react-slot"

// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import click from "~/assets/btn-click.mp3"
// eslint-disable-next-line @pretty-cozy/no-unspecific-imports
import hover from "~/assets/btn-hover.mp3"
import { audioSettingsAtom } from "~/data/audioSettings"
import { playAudio } from "~/utils/playAudio"

import { AsChildProp } from "./BaseProps"

type ButtonMouseEvent = MouseEvent<HTMLButtonElement>

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AsChildProp & {
    muteAudio?: ((e: ButtonMouseEvent) => boolean) | boolean
  }

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { asChild = false, onMouseEnter, onMouseDown, muteAudio, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const shouldPlay = (e: ButtonMouseEvent) => {
      if (muteAudio == null) return true
      return typeof muteAudio === "function" ? !muteAudio(e) : !muteAudio
    }
    return (
      <Comp
        ref={ref}
        onMouseDown={e => {
          if (shouldPlay(e as ButtonMouseEvent)) {
            void playAudio(click, {
              volume: audioSettingsAtom.get().buttonVolume,
            })
          }
          onMouseDown?.(e as ButtonMouseEvent)
        }}
        onMouseEnter={e => {
          if (shouldPlay(e as ButtonMouseEvent)) {
            void playAudio(hover, {
              volume: audioSettingsAtom.get().buttonVolume,
              playbackRate: 1.5,
            })
          }
          onMouseEnter?.(e as ButtonMouseEvent)
        }}
        {...props}
      />
    )
  }
)
BaseButton.displayName = "BaseButton"

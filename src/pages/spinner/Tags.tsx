import { useRef } from "react"

import { CopyClick } from "~/components/buttons/CopyClick"
import { useSize } from "~/hooks/useSize"
import { ClassNameProp } from "~/types/BaseProps"
import { ColorValue, bgColor, textColorDark } from "~/utils/colors"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { SpinnerStateProps } from "./Spinner"

interface PillProps extends ClassNameProp {
  color: ColorValue
  transitionDuration: number
  winner: boolean
  text: string
  number: number
}

const Pill = ({
  color,
  className,
  transitionDuration,
  winner,
  number,
  text,
}: PillProps) => (
  <span
    className={cn(
      "relative inline-flex max-w-[12em] select-none rounded-[0.4em] bg-muted px-[0.5em] py-[0.15em] font-medium transition-all",
      winner
        ? [bgColor({ color: "green" }), textColorDark({ color: "green" })]
        : [bgColor({ color }), textColorDark({ color })],
      className
    )}
    style={{
      transitionDuration: `${transitionDuration}ms`,
    }}
  >
    <span className={cn(noOverflow, "flex-1")}>
      {number}. {text}
    </span>
    {winner && (
      <>
        <CopyClick text={text} size="md" />
        <span className="absolute -bottom-2 -right-7 text-[2em]">🎉</span>
        <span className="absolute -bottom-2 -left-7 -scale-x-100 text-[2em]">
          🎉
        </span>
      </>
    )}
  </span>
)

export const Tags = ({
  current,
  items,
  winner,
  transitionDuration,
}: SpinnerStateProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { height, width } = useSize(ref)
  const size = Math.min(Math.min(height, width), 300)
  return (
    <div
      ref={ref}
      className="flex size-full items-center"
      style={{ fontSize: size / 17 }}
    >
      <div className="flex flex-wrap items-center justify-center gap-[0.5em]">
        {items.map(({ name, player }, index) => (
          <Pill
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            winner={winner === index}
            color={player.color}
            transitionDuration={transitionDuration}
            number={index + 1}
            text={name}
            className={cn(
              current == null
                ? ""
                : current === index
                ? "scale-105"
                : "opacity-10"
            )}
          />
        ))}
      </div>
    </div>
  )
}

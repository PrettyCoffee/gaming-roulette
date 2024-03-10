import { PropsWithChildren, useRef } from "react"

import { ClassNameProp } from "~/components/base/BaseProps"
import { useSize } from "~/hooks/useSize"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { SpinnerStateProps } from "./Spinner"

interface PillProps extends ClassNameProp {
  color: string
  transitionDuration: number
  winner: boolean
}

const Pill = ({
  color,
  children,
  className,
  transitionDuration,
  winner,
}: PropsWithChildren<PillProps>) => (
  <span
    className={cn(
      "transition-all",
      "relative inline-flex px-[0.5em] py-[0.15em] bg-muted rounded-[0.4em] max-w-[12em] font-medium",
      `bg-${color}-200 text-${color}-950`,
      winner && "bg-green-200 text-green-950",
      className
    )}
    style={{
      transitionDuration: `${transitionDuration}ms`,
    }}
  >
    <span className={cn(noOverflow, "flex-1")}>{children}</span>
    {winner && (
      <span className="absolute -bottom-[0.6em] -left-[0.45em] text-[2em]">
        🎉
      </span>
    )}
    {winner && (
      <span className="absolute -bottom-[0.6em] -right-[0.45em] text-[2em] scale-x-[-1]">
        🎉
      </span>
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
  const size = Math.min(height, width)
  return (
    <div
      ref={ref}
      className="h-full w-full flex items-center"
      style={{ fontSize: size / 17 }}
    >
      <div className="flex flex-wrap justify-center items-center gap-[0.5em]">
        {items.map(({ game, color }, index) => (
          <Pill
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            winner={winner === index}
            color={color}
            className={cn(
              current == null
                ? ""
                : current === index
                ? "scale-105"
                : "opacity-10"
            )}
            transitionDuration={transitionDuration}
          >
            {index + 1}. {game}
          </Pill>
        ))}
      </div>
    </div>
  )
}

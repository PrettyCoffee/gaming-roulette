import { PropsWithChildren } from "react"

import { ClassNameProp } from "~/components/base/BaseProps"
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
      "relative inline-flex px-2 py-0.5 bg-muted rounded-md max-w-[theme(width.48)] font-medium",
      `bg-${color}-200 text-${color}-950`,
      winner && "bg-green-200 text-green-950",
      className
    )}
    style={{
      transitionDuration: `${transitionDuration}ms`,
    }}
  >
    <span className={cn(noOverflow, "flex-1")}>{children}</span>
    {winner && <span className="absolute -bottom-3 -left-3 text-3xl">🎉</span>}
    {winner && (
      <span className="absolute -bottom-3 -right-3 text-3xl scale-x-[-1]">
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
}: SpinnerStateProps) => (
  <div className="flex flex-wrap justify-center gap-2">
    {items.map(({ game, color }, index) => (
      <Pill
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        winner={winner === index}
        color={color}
        className={cn(
          current == null ? "" : current === index ? "scale-105" : "opacity-10"
        )}
        transitionDuration={transitionDuration}
      >
        {index + 1}. {game}
      </Pill>
    ))}
  </div>
)

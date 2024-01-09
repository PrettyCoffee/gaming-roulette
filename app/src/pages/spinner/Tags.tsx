import { PropsWithChildren } from "react"

import { ClassNameProp } from "~/components/base/BaseProps"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

interface PillProps extends ClassNameProp {
  color: "blue" | "red"
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

      color === "red" ? "bg-red-200 text-red-950" : "bg-blue-200 text-blue-950",
      winner && "bg-green-200 text-green-950",
      className
    )}
    style={{
      transitionDuration: `${transitionDuration}ms`,
    }}
  >
    <span className={cn(noOverflow, "flex-1")}>{children}</span>
    {winner && <span className="absolute -top-6 -right-6 text-3xl">🎉</span>}
  </span>
)

interface TagsProps {
  items: string[]
  items1: string[]
  items2: string[]
  current?: number
  winner?: number
  transitionDuration: number
}
export const Tags = ({
  current,
  items,
  items1,
  winner,
  transitionDuration,
}: TagsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((value, index) => (
        <Pill
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          winner={winner === index}
          color={items1.includes(value) ? "red" : "blue"}
          className={cn(
            current == null
              ? ""
              : current === index
              ? "scale-105"
              : "opacity-10"
          )}
          transitionDuration={transitionDuration}
        >
          {index + 1}. {value}
        </Pill>
      ))}
    </div>
  )
}

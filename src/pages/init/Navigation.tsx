import { ArrowDown, ArrowUp, Check } from "lucide-react"

import { Icon } from "~/components/Icon"
import { IconButton } from "~/components/IconButton"
import { createRange } from "~/utils/array"
import { borderColor, textColor } from "~/utils/colors"
import { cn } from "~/utils/utils"

const StepPill = ({
  value,
  disabled,
  current,
  finished,
}: {
  value: number
  disabled: boolean
  current: boolean
  finished: boolean
}) => (
  <span
    className={cn(
      "inline-flex size-4 select-none items-center justify-center rounded-full bg-muted text-xs text-foreground",
      disabled && "text-muted-foreground",
      finished && textColor({ color: "green" }),
      current &&
        `font-bold text-background ${borderColor({
          color: "blue",
        })} ${textColor({ color: "blue" })}`
    )}
  >
    {finished ? <Icon icon={Check} color="current" size="xs" /> : value}
  </span>
)

interface NavigationProps {
  current: number
  steps: number
  progress: number
  goBack: () => void
  goNext: () => void
}
export const Navigation = ({
  current,
  goBack,
  goNext,
  steps,
  progress,
}: NavigationProps) => (
  <div className="absolute inset-y-2 right-2 z-20 flex flex-col items-center gap-0.5">
    <div className="flex flex-1 flex-col">
      <IconButton
        size="sm"
        icon={ArrowUp}
        title="Go back"
        titleSide="left"
        onClick={goBack}
        disabled={current === 0}
      />
      <IconButton
        size="sm"
        icon={ArrowDown}
        title="Go forward"
        titleSide="left"
        onClick={goNext}
        disabled={current === progress}
      />
    </div>
    {createRange(steps).map(step => (
      <StepPill
        key={step}
        value={step + 1}
        current={current === step}
        disabled={step > progress}
        finished={step < progress}
      />
    ))}
    <div className="flex-1" />
  </div>
)

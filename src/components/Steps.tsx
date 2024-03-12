import { Dispatch, PropsWithChildren, useMemo } from "react"

import { cva, VariantProps } from "class-variance-authority"

import { cn } from "~/utils/utils"

import { BaseButton } from "./base/BaseButton"

const pill = cva(
  cn(
    "relative isolate flex size-10 items-center justify-center rounded-full font-semibold outline-offset-2 [&>*]:z-10",
    "before:pointer-events-none before:absolute before:-left-full before:top-1/2 before:-z-10 before:h-2 before:w-12 before:-translate-y-1/2 before:rounded-full",
    "after:pointer-events-none after:absolute after:-right-full after:top-1/2 after:-z-10 after:h-2 after:w-12 after:-translate-y-1/2 after:rounded-full"
  ),
  {
    variants: {
      state: {
        default: "bg-muted text-foreground before:bg-muted after:bg-muted",
        active:
          "outline-color-blue-200 bg-blue-200 text-background before:bg-blue-200 after:bg-blue-200",
        success:
          "outline-color-green-200 bg-green-200 text-background before:bg-green-200 after:bg-green-200",
      },
      position: {
        first: "before:hidden",
        last: "after:hidden",
        between: "",
      },
    },
  }
)

interface PillProps extends VariantProps<typeof pill> {
  onClick?: () => void
}

const Pill = ({
  children,
  onClick,
  ...styles
}: PropsWithChildren<PillProps>) => (
  <BaseButton onClick={onClick} className={pill(styles)}>
    <span>{children}</span>
  </BaseButton>
)

interface StepProps extends VariantProps<typeof pill> {
  value: string
  onClick?: Dispatch<string>
  label: string
  number: number
}

const Step = ({
  label,
  value,
  number,
  onClick,
  state,
  position,
}: StepProps) => (
  <div
    className={cn(
      "relative flex-1",
      "flex flex-col items-center gap-1 first-of-type:items-start last-of-type:items-end",
      state === "success" && "after:bg-green-200",
      state === "active" && "after:bg-blue-200",
      state === "default" && "after:bg-muted"
    )}
  >
    <Pill state={state} position={position} onClick={() => onClick?.(value)}>
      {number}
    </Pill>
    <span className="text-sm text-foreground">{label}</span>
  </div>
)

interface StepsProps {
  steps: Pick<StepProps, "label" | "value">[]
  value: string
  onChange: Dispatch<string>
}

export const Steps = ({ steps, value, onChange }: StepsProps) => {
  const current = useMemo(
    () => steps.findIndex(step => step.value === value),
    [steps, value]
  )
  return (
    <div className="flex flex-row">
      {steps.map((step, index) => (
        <Step
          key={step.value}
          label={step.label}
          value={step.value}
          number={index + 1}
          onClick={onChange}
          state={
            index < current
              ? "success"
              : index === current
              ? "active"
              : "default"
          }
          position={
            index === 0
              ? "first"
              : index === steps.length - 1
              ? "last"
              : "between"
          }
        />
      ))}
    </div>
  )
}

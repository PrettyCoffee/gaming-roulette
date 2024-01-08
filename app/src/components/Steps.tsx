import { Dispatch, PropsWithChildren, useMemo } from "react";
import { cn } from "~/utils/utils";
import { cva, VariantProps } from "class-variance-authority";

const pill = cva(cn(
  "isolate relative h-10 w-10 rounded-full font-semibold flex items-center justify-center outline-offset-2 [&>*]:z-10",
  "before:absolute before:-z-10 before:rounded-full before:h-2 before:w-12 before:top-1/2 before:-translate-y-1/2 before:-left-full before:pointer-events-none",
  "after:absolute after:-z-10 after:rounded-full after:h-2 after:w-12 after:top-1/2 after:-translate-y-1/2 after:-right-full after:pointer-events-none",
), {
  variants: {
    state: {
      default: "text-foreground bg-muted before:bg-muted after:bg-muted",
      active: "text-background outline-color-blue-200 bg-blue-200 before:bg-blue-200 after:bg-blue-200",
      success: "text-background outline-color-green-200 bg-green-200 before:bg-green-200 after:bg-green-200",
    },
    position: {
      first: "before:hidden",
      last: "after:hidden",
      between: "",
    }
  }
})

interface PillProps extends VariantProps<typeof pill> {
  onClick?: () => void
}

const Pill = ({ children, onClick, ...styles }: PropsWithChildren<PillProps>) => (
  <button
    onClick={onClick}
    className={pill(styles)}
  >
    <span>
      {children}
    </span>
  </button>
)

interface StepProps extends VariantProps<typeof pill> {
  value: string
  onClick?: Dispatch<string>
  label: string
  number: number
}

const Step = ({ label, value, number, onClick, state, position }: StepProps) => (
  <div className={cn(
    "relative flex-1",
    "flex flex-col gap-1 items-center first-of-type:items-start last-of-type:items-end",
    state === "success" && "after:bg-green-200",
    state === "active" && "after:bg-blue-200",
    state === "default" && "after:bg-muted",
    )
  }>
    <Pill
      state={state}
      position={position}
      onClick={() => onClick?.(value)}
    >
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
  const current = useMemo(() => steps.findIndex((step) => step.value === value), [steps, value])
  return (
    <div className="flex flex-row">
      {steps.map((step, index) => (
        <Step
          key={step.value}
          label={step.label}
          value={step.value}
          number={index + 1}
          onClick={onChange}
          state={index < current ? "success" : index === current ? "active" : "default"}
          position={index === 0 ? "first" : index === steps.length - 1 ? "last" : "between"}
        />
      ))}
    </div>
  )
}

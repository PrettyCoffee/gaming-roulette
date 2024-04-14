import { PropsWithChildren } from "react"

import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { InfoHint } from "./InfoHint"

interface InputLabelProps extends ClassNameProp {
  htmlFor?: string
  hint?: string
}

export const InputLabel = ({
  htmlFor,
  children,
  className,
  hint,
}: PropsWithChildren<InputLabelProps>) => (
  <div className={cn("mb-1 inline-flex items-center", noOverflow, className)}>
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-semibold text-muted-foreground", noOverflow)}
    >
      {children}
    </label>
    {hint && <InfoHint>{hint}</InfoHint>}
  </div>
)

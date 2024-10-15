import { PropsWithChildren } from "react"

import { Label } from "@radix-ui/react-label"

import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "../base/BaseProps"
import { InfoHint } from "../InfoHint"

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
    <Label
      htmlFor={htmlFor}
      className={cn("text-sm font-semibold text-muted-foreground", noOverflow)}
    >
      {children}
    </Label>
    {hint && <InfoHint>{hint}</InfoHint>}
  </div>
)

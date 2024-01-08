import { PropsWithChildren } from "react"

import { ClassNameProp } from "./base/BaseProps"
import { cn } from "~/utils/utils"

interface InputLabelProps extends ClassNameProp {
  htmlFor: string
}

export const InputLabel = ({
  htmlFor,
  children,
  className,
}: PropsWithChildren<InputLabelProps>) => (
  <label htmlFor={htmlFor} className={cn("inline-block text-sm font-semibold mb-1 text-muted-foreground", className)}>
    {children}
  </label>
)

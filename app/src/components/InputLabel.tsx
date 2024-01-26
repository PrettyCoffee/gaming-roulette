import { PropsWithChildren } from "react"

import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"

interface InputLabelProps extends ClassNameProp {
  htmlFor: string
}

export const InputLabel = ({
  htmlFor,
  children,
  className,
}: PropsWithChildren<InputLabelProps>) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      "inline-block text-sm font-semibold mb-1 text-muted-foreground",
      noOverflow,
      className
    )}
  >
    {children}
  </label>
)

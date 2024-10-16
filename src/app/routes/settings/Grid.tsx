import { PropsWithChildren } from "react"

import { ClassNameProp } from "~/types/BaseProps"
import { cn } from "~/utils/utils"

const Root = ({ children, className }: PropsWithChildren<ClassNameProp>) => (
  <div className={cn("grid grid-cols-2 gap-4 p-2 pt-0", className)}>
    {children}
  </div>
)

const Item = ({
  children,
  newLine,
  fullWidth,
  className,
}: PropsWithChildren<
  ClassNameProp & { newLine?: boolean; fullWidth?: boolean }
>) => (
  <div
    className={cn(
      fullWidth ? "col-span-full" : "col-span-1",
      newLine && "col-start-1",
      className
    )}
  >
    {children}
  </div>
)

export const Grid = { Root, Item }

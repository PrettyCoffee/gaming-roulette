import { PropsWithChildren } from "react"

import { cn } from "~/utils/utils"

const Root = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-2 gap-2 p-2 pt-0">{children}</div>
)

const Item = ({
  children,
  newLine,
}: PropsWithChildren<{ newLine?: boolean }>) => (
  <div className={cn("col-span-1", newLine && "col-start-1")}>{children}</div>
)

export const Grid = { Root, Item }

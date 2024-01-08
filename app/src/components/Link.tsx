import { PropsWithChildren } from "react"
import { ClassNameProp } from "./base/BaseProps"
import { cn } from "~/utils/utils"

interface LinkProps extends ClassNameProp {
  href: string
  target?: "_blank" | "_self"
  onClick?: () => void
}

export const Link = ({ children, className, ...delegated }: PropsWithChildren<LinkProps>) => (
  <a
    className={cn(
      "inline-flex gap-1 items-center",
      "font-medium text-primary hover:underline underline-offset-4",
      "rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...delegated}
  >
    {children}
  </a>
)

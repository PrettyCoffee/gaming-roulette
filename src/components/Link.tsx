import { PropsWithChildren } from "react"

import { isTauriEnv } from "~/utils/isTauriEnv"
import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"

interface LinkProps extends ClassNameProp {
  href: string
  target?: "_blank" | "_self"
  onClick?: () => void
}

export const Link = ({
  children,
  className,
  ...delegated
}: PropsWithChildren<LinkProps>) => (
  <a
    className={cn(
      "inline-flex items-center gap-1",
      "font-medium text-primary underline-offset-4 hover:underline",
      "rounded-sm ring-offset-background focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...delegated}
  >
    {children}
    {isTauriEnv() && (
      <div
        className={cn(
          "[:not(:hover)>&]:hidden",
          "fixed bottom-1 right-1 z-[99999] rounded-md border border-muted-foreground/15 bg-accent/75 px-2 py-1 shadow-md backdrop-blur-md"
        )}
      >
        {delegated.href}
      </div>
    )}
  </a>
)

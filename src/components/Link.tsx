import { PropsWithChildren } from "react"

import { isTauriEnv } from "~/utils/isTauriEnv"
import { focusRing } from "~/utils/styles"
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
      "inline-flex w-max items-center gap-1 rounded-sm font-medium text-primary underline-offset-4 hover:underline",
      focusRing,
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

import { PropsWithChildren } from "react"

import { TooltipProvider } from "@radix-ui/react-tooltip"
import { LazyMotion, domAnimation } from "framer-motion"

import { Toaster } from "components/feedback/Toaster"

export const AppProviders = ({ children }: PropsWithChildren) => (
  <LazyMotion strict features={domAnimation}>
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  </LazyMotion>
)

import React from "react"

import { TooltipProvider } from "@radix-ui/react-tooltip"
import { LazyMotion, domAnimation } from "framer-motion"
import { createRoot } from "react-dom/client"

import { App } from "./App"
import { Toaster } from "./components/Toaster"
import "./globals.css"

const root = document.getElementById("root")

if (!root) throw new Error("Root element not found")

createRoot(root).render(
  <React.StrictMode>
    <LazyMotion strict features={domAnimation}>
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
    </LazyMotion>
  </React.StrictMode>
)

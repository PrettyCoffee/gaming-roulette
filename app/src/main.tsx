import React from "react"

import { TooltipProvider } from "@radix-ui/react-tooltip"
import { createRoot } from "react-dom/client"

import { App } from "./App"

import "./globals.css"

const root = document.getElementById("root")

if (!root) throw new Error("Root element not found")

createRoot(root).render(
  <React.StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </React.StrictMode>
)

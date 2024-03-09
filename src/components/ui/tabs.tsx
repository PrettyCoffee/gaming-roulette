import * as React from "react"

import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "~/utils/utils"

import { BaseButton } from "../base/BaseButton"

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
List.displayName = TabsPrimitive.List.displayName

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, asChild, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:cursor-default",
      "hover:bg-background/25",
      className
    )}
    asChild
    {...props}
  >
    <BaseButton
      muteAudio={({ currentTarget }) =>
        currentTarget.dataset["state"] === "active"
      }
      asChild={asChild}
    >
      {children}
    </BaseButton>
  </TabsPrimitive.Trigger>
))
Trigger.displayName = TabsPrimitive.Trigger.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
Content.displayName = TabsPrimitive.Content.displayName

export const Tabs = { ...TabsPrimitive, List, Trigger, Content }

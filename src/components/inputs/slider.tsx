import * as React from "react"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "utils/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, id, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-2.5",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      id={id}
      className={cn(
        "block size-6 rounded-full border-2 border-primary bg-background transition-colors",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-grab active:cursor-grabbing",
        "before:absolute before:-inset-2"
      )}
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

<script lang="ts" context="module">
  import { cva, type VariantProps } from "class-variance-authority"

  import { cn } from "./utils/cn"
  import { focusRing } from "./utils/styles"

  const button = cva(
    cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium",
      focusRing
    ),
    {
      variants: {
        variant: {
          default:
            "bg-button text-foreground hover:bg-button-hover active:bg-button",
          outline:
            "bg-transparent text-foreground border border-input bg-transparent hover:bg-hover",
          ghost: "bg-transparent text-foreground hover:bg-hover",
        },
        size: {
          default: "h-10 px-4 py-2",
          icon: "h-10 w-10 min-w-[theme(width.10)] min-h-[theme(height.10)] max-w-[theme(width.10)] max-h-[theme(height.10)]",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )
</script>

<script lang="ts">
  let className = ""
  export { className as class }
  export let variant: VariantProps<typeof button>["variant"] = undefined
  export let size: VariantProps<typeof button>["size"] = undefined
</script>

<button class={cn(button({ variant, size }), className)}>
  <slot />
</button>

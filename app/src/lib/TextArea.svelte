<script lang="ts" context="module">
  import { cn } from "./utils/cn"
  import { focusRing } from "./utils/styles"
</script>

<script lang="ts">
  let className = ""
  export { className as class }
  export let value = ""
  export let onInput: (value: string) => void = () => null
  export let readonly = false

  const getEventValue = (event: Event) =>
    (event.target as HTMLTextAreaElement).value
</script>

<textarea
  {readonly}
  {value}
  on:input={event => onInput(getEventValue(event))}
  class={cn(
    focusRing,
    "bg-background border border-border rounded-md text-foreground p-4 w-full resize-none",
    "read-only:text-muted-foreground",
    className
  )}
/>

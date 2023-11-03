<script lang="ts">
  import Button from "./lib/Button.svelte"
  import Icon from "./lib/Icon.svelte"
  import TextArea from "./lib/TextArea.svelte"
  import TextCarousel from "./lib/TextCarousel.svelte"
  import { shuffle } from "./lib/utils/array"
  import { cn } from "./lib/utils/cn"
  import { storage } from "./lib/utils/storage"

  const getListFromText = (text: string) =>
    text
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean)

  const store1 = storage(
    "text1",
    "Game 1.1\nGame 1.2\nGame 1.3\nGame 1.4\nGame 1.5\nGame 1.6\nGame 1.7\nGame 1.8\nGame 1.9\nGame 1.10"
  )
  const store2 = storage(
    "text2",
    "Game 2.1\nGame 2.2\nGame 2.3\nGame 2.4\nGame 2.5\nGame 2.6\nGame 2.7\nGame 2.8\nGame 2.9\nGame 2.10"
  )
  const winners = storage<string[]>("winners", [])

  let list: string[]
  const reset = () =>
    (list = [...getListFromText($store1), ...getListFromText($store2)])
  store1.subscribe(reset)
  store2.subscribe(reset)

  let spinning = false
</script>

<main
  class="flex flex-col gap-20 items-center justify-center lg:flex-row lg:items-start w-full min-h-full py-12"
>
  <TextCarousel
    items={list}
    onSpinStart={() => (spinning = true)}
    onSpinEnd={game => (winners.update(w => [...w, game]), (spinning = false))}
  />

  <div
    class="grid gap-4 grid-cols-[repeat(2,theme(width.48))] grid-rows-[17rem,1fr]"
  >
    <TextArea
      readonly={spinning}
      bind:value={$store1}
      onInput={store1.set}
      class="whitespace-pre py-2 border-red-200"
    />
    <TextArea
      readonly={spinning}
      bind:value={$store2}
      onInput={store2.set}
      class="whitespace-pre py-2 border-blue-200"
    />
    <div class="col-span-2 whitespace-pre">
      <Button
        disabled={spinning}
        on:click={() =>
          (list = shuffle($store1.split("\n"), $store2.split("\n")))}
      >
        <Icon icon="shuffle" class="[svg]:text-white" />
        <span>Shuffle Games</span>
      </Button>
      <div class="overflow-y-scroll max-h-full mt-4">
        <div class="flex flex-wrap gap-1">
          {#each list as item, index}
            <span
              class={cn(
                "px-1 py-0.5 bg-muted rounded-md",
                $store1.includes(item)
                  ? "bg-red-200 text-red-950"
                  : "bg-blue-200 text-blue-950"
              )}
            >
              {index + 1}. {item}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>

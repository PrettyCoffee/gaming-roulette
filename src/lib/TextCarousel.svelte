<script lang="ts" context="module">
  import { cn } from "./utils/cn"
  import clickSound from "../assets/click.mp3"

  const rotateArrayIndex = (items: number, current: number, step = 1) =>
    // items * 2 is needed to make sure the index is always positive
    (current + step + items * 2) % items

  const getItemPosition = (items: number, index: number, active: number) => {
    if (index === active) {
      return 0
    }
    switch (index) {
      case rotateArrayIndex(items, active, 1):
        return 1
      case rotateArrayIndex(items, active, -1):
        return -1
      case rotateArrayIndex(items, active, 2):
        return 2
      case rotateArrayIndex(items, active, -2):
        return -2
      case rotateArrayIndex(items, active, 3):
        return 3
      case rotateArrayIndex(items, active, -3):
        return -3
      default:
        return 4
    }
  }

  const rotation: Record<number, number> = {
    3: 90,
    2: 65,
    1: 30,
    0: 0,
    "-1": -30,
    "-2": -65,
    "-3": -90,
  }

  const offsetY: Record<number, number> = {
    3: -9,
    2: -7.95,
    1: -4.7,
    0: 0,
    "-1": 4.7,
    "-2": 7.95,
    "-3": 9,
  }

  const offsetZ: Record<number, number> = {
    3: -9.5,
    2: -4.8,
    1: -1.25,
    0: 0,
    "-1": -1.25,
    "-2": -4.8,
    "-3": -9.5,
  }

  const opacityByPosition: Record<number, number> = {
    3: 0,
    2: 0.3,
    1: 0.6,
    0: 1,
    "-1": 0.6,
    "-2": 0.3,
    "-3": 0,
  }
  const getStyles = (items: number, index: number, active: number) => {
    const position = getItemPosition(items, index, active)
    const rotate = rotation[position] ?? 0
    const y = (offsetY[position] ?? 0) - 2.5
    const z = offsetZ[position] ?? 0
    if (position === 4) return "display: none;"
    return `
    opacity: ${opacityByPosition[position] ?? 0};
    transform:
      perspective(1000px)
      translateY(${y}rem)
      translateZ(${z}rem)
      rotateX(${rotate}deg);
    `
  }

  new Audio(clickSound) // preload
  const playClickSound = () => new Audio(clickSound).play()

  const isWinner = (items: number, index: number) =>
    randomBetween(0, items) === index
</script>

<script lang="ts">
  import Button from "./Button.svelte"
  import Icon from "./Icon.svelte"
  import { randomBetween } from "./utils/number"

  export let items: string[] = []
  export let onSpinStart: () => void
  export let onSpinEnd: (winner: string) => void

  let winner: string | undefined

  let activeItem = 0

  let direction: "none" | "faster" | "slower" = "none"

  let currentMs = 200
  let timeout: number
  const next = () => {
    const diff = 10
    const ms = direction === "faster" ? currentMs - diff : currentMs + diff
    if (ms < 50) {
      direction = "slower"
    }
    if (
      ms > 300 &&
      direction === "slower" &&
      isWinner(items.length, activeItem)
    ) {
      winner = items[activeItem]!
      onSpinEnd(winner)
      direction = "none"
      return
    }

    activeItem = rotateArrayIndex(items.length, activeItem)
    currentMs = ms
    playClickSound()

    if (ms > 0) {
      timeout = setTimeout(() => next(), ms)
    }
  }

  const spin = () => {
    onSpinStart()
    clearTimeout(timeout)
    currentMs = 200
    direction = "faster"
    winner = undefined
    next()
  }
</script>

<div class="px-8">
  <div
    class="w-80 flex flex-col items-center h-72 relative"
    style="perspective: 800; transform-style: preserve-3d; /* transform: rotateX(-5deg) rotateY(95deg) rotateZ(-5deg); */"
  >
    {#each items as item, index}
      <div
        style={`transition: ${
          item === winner ? 250 : currentMs + 10
        }ms linear; ${getStyles(items.length, index, activeItem)}`}
        class={cn(
          "absolute w-96 h-20 text-3xl px-4 whitespace-nowrap text-ellipsis rounded-md flex items-center justify-center top-1/2 bg-muted",
          item === winner && "bg-green-500"
        )}
      >
        <span
          class="max-w-full whitespace-nowrap text-ellipsis overflow-hidden"
        >
          {item}
        </span>
        {#if item === winner}
          <span class="absolute -top-8 -right-16 text-7xl">🎉</span>
        {/if}
      </div>
    {/each}
  </div>
  <Button
    disabled={direction !== "none"}
    variant="default"
    on:click={spin}
    class="w-full"
  >
    <Icon icon="dices" />
    <span>Spin</span>
  </Button>
</div>

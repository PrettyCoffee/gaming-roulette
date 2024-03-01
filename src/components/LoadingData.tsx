import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { cva } from "class-variance-authority"

import { cn } from "~/utils/utils"

const square = cva("rounded opacity-50", {
  variants: {
    color: {
      red: "bg-red-200",
      blue: "bg-blue-200",
      green: "bg-green-200",
      yellow: "bg-yellow-200",
    },
  },
})

const size = "2rem"

const rotate = keyframes`
  0% {
    top: 0;
    left: 0;
  }
  8.3%, 16.6%, 25% {
    top: 0;
    left: var(--offset);
  }
  33.3%, 41.6%, 50% {
    top: var(--offset);
    left: var(--offset);
  }
  58.3%, 66.6%, 75% {
    top: var(--offset);
    left: 0;
  }
  83.3%, 91.6%, 100% {
    top: 0;
    left: 0;
  }
`

const Square = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${size};
  width: ${size};

  --offset: calc(100% - ${size});

  :nth-of-type(1) {
    animation-delay: 0s;
  }
  :nth-of-type(2) {
    animation-delay: -1s;
  }
  :nth-of-type(3) {
    animation-delay: -2s;
  }

  animation: ${rotate} 3s infinite ease-in-out;
`

export const LoadingData = ({ label }: { label: string }) => (
  <div className="flex flex-col gap-4 items-center">
    <div className="relative h-[4.5rem] w-[4.5rem]">
      <Square className={cn(square({ color: "red" }))} />
      <Square className={cn(square({ color: "blue" }))} />
      <Square className={cn(square({ color: "green" }))} />
    </div>
    <span className="text-md font-bold text-muted-foreground">{label}</span>
  </div>
)

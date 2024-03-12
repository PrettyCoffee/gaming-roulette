import { cva } from "class-variance-authority"
import { keyframes, css } from "goober"

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

const square = css`
  --offset: calc(100% - 1em);

  &:nth-of-type(1) {
    animation-delay: 0s;
  }
  &:nth-of-type(2) {
    animation-delay: -1s;
  }
  &:nth-of-type(3) {
    animation-delay: -2s;
  }

  animation: ${rotate} 3s infinite ease-in-out;
`

const squareColor = cva(
  ["absolute left-0 top-0 size-8 rounded text-[2rem] opacity-50", square],
  {
    variants: {
      color: {
        red: "bg-red-200",
        blue: "bg-blue-200",
        green: "bg-green-200",
        yellow: "bg-yellow-200",
      },
    },
  }
)

export const LoadingData = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative size-[4.5rem]">
      <div className={squareColor({ color: "red" })} />
      <div className={squareColor({ color: "blue" })} />
      <div className={squareColor({ color: "green" })} />
    </div>
    <span className="text-md font-bold text-muted-foreground">{label}</span>
  </div>
)

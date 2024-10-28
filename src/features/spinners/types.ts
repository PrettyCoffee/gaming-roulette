import { Player } from "data/players"

export interface SpinnerItem {
  name: string
  player: Player
}

export interface SpinnerStateProps {
  items: SpinnerItem[]
  current?: number
  winner?: number
  transitionDuration: number
}

import { IconProp } from "./BaseProps"

export type RoutePath =
  | ""
  | "current-games"
  | "game-picker"
  | "overview"
  | "settings"

export interface RouteMeta extends Required<IconProp> {
  label: string
}

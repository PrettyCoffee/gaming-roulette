import { type FunctionComponent, type LazyExoticComponent } from "react"

import { type RouteMeta, type RoutePath } from "types/routes"

export type LazyOrFunctionComponent<Props = {}> =
  | LazyExoticComponent<FunctionComponent<Props>>
  | FunctionComponent<Props>

export interface Route {
  path: RoutePath
  meta: RouteMeta
  Component: LazyOrFunctionComponent
}

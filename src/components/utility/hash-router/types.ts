import { FunctionComponent, LazyExoticComponent } from "react"

import { RouteMeta, RoutePath } from "~/types/routes"

export type LazyOrFunctionComponent<Props = {}> =
  | LazyExoticComponent<FunctionComponent<Props>>
  | FunctionComponent<Props>

export interface Route {
  path: RoutePath
  meta: RouteMeta
  Component: LazyOrFunctionComponent
}

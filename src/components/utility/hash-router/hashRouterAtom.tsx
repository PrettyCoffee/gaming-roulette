import { createAtom, createEffect, useAtomValue } from "~/lib/yaasl"
import { RoutePath } from "~/types/routes"

const getLocationHash = () => window.location.hash.slice(1) as RoutePath

const syncUrlHash = createEffect<undefined, string>(({ atom }) => {
  let skipHashChange = false

  window.addEventListener("hashchange", () => {
    if (skipHashChange) {
      skipHashChange = false
    } else {
      atom.set(getLocationHash())
    }
  })

  return {
    init: ({ set }) => set(getLocationHash()),
    set: ({ value }) => {
      skipHashChange = true
      window.location.hash = value
    },
  }
})

const hashRouterAtom = createAtom({
  name: "route",
  defaultValue: "" as RoutePath,
  effects: [syncUrlHash()],
})

export const setHashRoute = (value: RoutePath) => hashRouterAtom.set(value)
export const useHashRoute = () => useAtomValue(hashRouterAtom)

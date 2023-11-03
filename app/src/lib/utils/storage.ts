import { writable } from "svelte/store"

const getStorageItem = (key: string) => {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

const setStorageItem = <T>(key: string, value: T) => {
  const item = JSON.stringify(value)
  window.localStorage.setItem(key, item)
}

export const storage = <T>(key: string, initialValue: T) => {
  const prefixedKey = `gaming-roulette/${key}`
  const store = writable<T>(getStorageItem(prefixedKey) ?? initialValue)
  store.subscribe(value => setStorageItem(prefixedKey, value))
  return store
}

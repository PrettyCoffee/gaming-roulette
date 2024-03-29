import { useCallback, useEffect, useRef, useState } from "react"

import { RefreshCw } from "lucide-react"

import { Icon } from "~/components/Icon"
import { LoadingData } from "~/components/LoadingData"
import { Button } from "~/components/ui/button"
import { useGames } from "~/data/gamesExternal"

const useDelayValueChange = <T,>(value: T, delay = 500) => {
  const [blockedValue, setBlockedValue] = useState(value)
  const isBlocked = useRef(false)
  const latestValue = useRef(value)
  const timeout = useRef<NodeJS.Timeout>()

  const blockChanges = useCallback(() => {
    isBlocked.current = true
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      setBlockedValue(latestValue.current)
      isBlocked.current = false
    }, delay)
  }, [delay])

  useEffect(() => {
    if (value == null) {
      setBlockedValue(value)
      blockChanges()
      return
    }

    if (isBlocked.current) {
      latestValue.current = value
      return
    }

    setBlockedValue(value)
  }, [value, blockChanges])

  return blockedValue
}

export const SyncGithub = () => {
  const { games, refreshGames } = useGames()

  const debouncedGames = useDelayValueChange(games, 2000)

  if (!debouncedGames)
    return (
      <div className="fixed inset-0 z-50 flex size-full items-center justify-center bg-base/50">
        <LoadingData label="Loading data..." />
      </div>
    )

  return (
    <Button variant="flat" onClick={refreshGames}>
      <Icon icon={RefreshCw} size="sm" />
      Sync data
    </Button>
  )
}

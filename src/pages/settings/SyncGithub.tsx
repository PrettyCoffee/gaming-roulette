import { useState } from "react"

import { RefreshCw } from "lucide-react"

import { Icon } from "~/components/Icon"
import { LoadingData } from "~/components/LoadingData"
import { Button } from "~/components/ui/button"
import { useGames } from "~/data/gamesExternal"
import { useGithub } from "~/data/github"

export const SyncGithub = () => {
  const [loading, setLoading] = useState(false)
  const { games, refreshGames } = useGames()
  const { incomplete } = useGithub()

  const onRefresh = () => {
    refreshGames()
    // Show loading state for at least 2 seconds
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  if (loading || !games)
    return (
      <div className="fixed inset-0 z-50 flex size-full items-center justify-center bg-base/50">
        <LoadingData label="Loading data..." />
      </div>
    )

  return (
    <Button variant="flat" onClick={onRefresh} disabled={incomplete}>
      <Icon icon={RefreshCw} size="sm" />
      Sync data
    </Button>
  )
}

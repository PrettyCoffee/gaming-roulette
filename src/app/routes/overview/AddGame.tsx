import { useState } from "react"

import { Plus } from "lucide-react"

import { Button } from "components/buttons/Button"
import { IconButton } from "components/buttons/IconButton"
import { useGames } from "data/games"
import { today } from "utils/date"

import { GameModal } from "./GameModal"

export const AddGame = ({ label }: { label?: string }) => {
  const { addGame } = useGames()
  const [adding, setAdding] = useState(false)

  return (
    <>
      {adding && (
        <GameModal
          initialValue={{ date: today() }}
          onCancel={() => setAdding(false)}
          title="Add game"
          description={`Fill in th information about your game and click on "Save" to add it.`}
          onConfirm={({ date, name, player }) => {
            setAdding(false)
            if (name && date)
              addGame({ date, name, playerId: player?.id ?? "" })
          }}
        />
      )}

      {label ? (
        <Button variant="ghost" onClick={() => setAdding(true)}>
          {label}
        </Button>
      ) : (
        <IconButton
          icon={Plus}
          title="Add game"
          onClick={() => setAdding(true)}
        />
      )}
    </>
  )
}

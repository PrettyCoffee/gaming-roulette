import { useState } from "react"

import { NoData } from "~/components/NoData"
import { Button } from "~/components/ui/button"
import { Game, useGames } from "~/data/games"
import { today } from "~/utils/date"

import { GameModal } from "./GameModal"
import { GamesTable } from "./GamesTable"

const AddGame = ({ label }: { label: string }) => {
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
      <Button variant="ghost" onClick={() => setAdding(true)}>
        {label}
      </Button>
    </>
  )
}

export const RolledGames = () => {
  const { games, removeGame, editGame } = useGames()
  const [editing, setEditing] = useState<Game | undefined>()

  if (games.length === 0)
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <NoData
          label={
            <>
              You didn&apos;t roll any games yet.
              <br />
              Visit the Game Picker to change that!
            </>
          }
        />
        <AddGame label="Or add one manually" />
      </div>
    )

  return (
    <>
      {editing && (
        <GameModal
          initialValue={editing}
          onCancel={() => setEditing(undefined)}
          title="Edit game"
          description={`Edit "${editing.name}" to your liking and click on "Save" to confirm.`}
          onConfirm={({ id, date, name, player }) => {
            setEditing(undefined)
            if (id)
              editGame(id, {
                date,
                name: name?.slice(0, 50),
                playerId: player?.id,
              })
          }}
        />
      )}

      <div className="-mr-2 -mt-2 flex h-full flex-col gap-2">
        <div className="flex flex-col overflow-auto [&>*]:h-full [&>*]:flex-1">
          <GamesTable
            data={games}
            onEdit={setEditing}
            onDelete={({ id }) => removeGame(id)}
          />
        </div>
        <div>
          <AddGame label="Add game" />
        </div>
      </div>
    </>
  )
}

import { useState } from "react"

import { Modal } from "~/components/Modal"
import { NoData } from "~/components/NoData"
import { Game, useGames } from "~/data/games"
import { textColor } from "~/utils/colors"
import { cn } from "~/utils/utils"

import { AddGame } from "./AddGame"
import { GameModal } from "./GameModal"
import { GamesTable } from "./GamesTable"

interface DeleteGameProps {
  game: Game
  onConfirm: () => void
  onCancel: () => void
}
const DeleteGame = ({ game, onConfirm, onCancel }: DeleteGameProps) => (
  <Modal
    open
    title="Remove game"
    description={
      <>
        {"Do you really want to remove "}
        <b className={cn("opacity-75", textColor({ color: "red" }))}>
          {game.name}
        </b>
        {" from your played games?"}
      </>
    }
    confirm={{ label: "Delete", variant: "destructive", onClick: onConfirm }}
    cancel={{ label: "Cancel", onClick: onCancel }}
  />
)

const Overview = () => {
  const { games, removeGame, editGame } = useGames()
  const [editing, setEditing] = useState<Game | undefined>()
  const [deleting, setDeleting] = useState<Game | undefined>()

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
          onConfirm={({ id, name, player, ...rest }) => {
            setEditing(undefined)
            if (id)
              editGame(id, {
                name: name?.slice(0, 50),
                playerId: player?.id,
                ...rest,
              })
          }}
        />
      )}

      {deleting && (
        <DeleteGame
          game={deleting}
          onConfirm={() => {
            removeGame(deleting.id)
            setDeleting(undefined)
          }}
          onCancel={() => setDeleting(undefined)}
        />
      )}

      <div className="-m-2 flex h-[calc(100%+theme(height.4))] flex-col gap-2">
        <div className="flex flex-col overflow-auto [&>*]:h-full [&>*]:flex-1">
          <GamesTable data={games} onEdit={setEditing} onDelete={setDeleting} />
        </div>
      </div>
    </>
  )
}

export default Overview

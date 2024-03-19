import { useState } from "react"

import { PenBox, Trash } from "lucide-react"

import { IconButton } from "~/components/IconButton"
import { NoData } from "~/components/NoData"
import { Button } from "~/components/ui/button"
import { Table } from "~/components/ui/table"
import { Game, useGames } from "~/data/games"
import { Player } from "~/data/players"
import { today } from "~/utils/date"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

import { GameModal } from "./GameModal"

const Swatch = ({ color }: { color: string }) => (
  <span
    className={cn(
      "mr-1 inline-block size-4 rounded-sm border border-base/50",
      `bg-${color}-200`
    )}
  />
)

const getgamesByPlayers = (games: Game[]) =>
  games.reduce<Record<string, { count: number; player: Player }>>(
    (result, game) => {
      const { player } = game
      if (!player) return result

      return {
        ...result,
        [player.id]: {
          player,
          count: (result[player.id]?.count ?? 0) + 1,
        },
      }
    },
    {}
  )

const Footer = () => {
  const { games } = useGames()

  const gamesByPlayers = getgamesByPlayers(games)

  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={4}>
          <div className="flex items-center gap-4">
            Count:
            {Object.values(gamesByPlayers).map(({ count, player }) => (
              <div key={player.id} className="inline-flex items-center">
                <Swatch color={player.color} />
                {count}
              </div>
            ))}
            <div className="flex-1" />
            Total: {games.length}
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  )
}

interface GamesTableProps {
  games: Game[]
  onDelete: (game: Game) => void
  onEdit: (game: Game) => void
}

const GamesTable = ({ games, onDelete, onEdit }: GamesTableProps) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row className="border-none">
          <Table.Head>Name</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head>Player</Table.Head>
          <Table.Head></Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {games.map(game => (
          <Table.Row key={game.id}>
            <Table.Cell className={noOverflow}>{game.name}</Table.Cell>
            <Table.Cell className={noOverflow}>{game.date}</Table.Cell>
            <Table.Cell
              className={cn(`text-${game.player?.color ?? ""}-200`, noOverflow)}
            >
              {game.player?.name}
            </Table.Cell>
            <Table.Cell className="w-24 min-w-24 px-2 opacity-0 [tr:focus-within_&]:opacity-100 [tr:hover_&]:opacity-100">
              <IconButton
                icon={PenBox}
                title="Edit"
                onClick={() => onEdit(game)}
              />
              <IconButton
                icon={Trash}
                title="Delete"
                onClick={() => onDelete(game)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Footer />
    </Table.Root>
  )
}

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
            games={games}
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

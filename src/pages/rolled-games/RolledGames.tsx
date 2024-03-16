import { Trash } from "lucide-react"

import { IconButton } from "~/components/IconButton"
import { NoData } from "~/components/NoData"
import { Table } from "~/components/ui/table"
import { Game, useGames } from "~/data/games"
import { Player } from "~/data/players"
import { noOverflow } from "~/utils/styles"
import { cn } from "~/utils/utils"

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

const GamesTable = () => {
  const { games, removeGame } = useGames()
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
            <Table.Cell className="w-12 min-w-12 px-2 opacity-0 [tr:focus-within_&]:opacity-100 [tr:hover_&]:opacity-100">
              <IconButton
                icon={Trash}
                title="Delete"
                onClick={() => removeGame(game.id)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Footer />
    </Table.Root>
  )
}

export const RolledGames = () => {
  const { games } = useGames()

  if (games.length === 0)
    return (
      <div className="flex size-full items-center justify-center">
        <NoData
          label={
            <>
              You didn&apos;t roll any games yet.
              <br />
              Visit the Game Picker to change that!
            </>
          }
        />
      </div>
    )

  return (
    <div className="-mr-2 -mt-2 flex h-full flex-col gap-2">
      <div className="flex flex-col overflow-auto [&>*]:h-full [&>*]:flex-1">
        <GamesTable />
      </div>
    </div>
  )
}

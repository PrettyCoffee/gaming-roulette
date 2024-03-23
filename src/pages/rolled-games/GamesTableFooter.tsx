import { Swatch } from "~/components/Swatch"
import { Table } from "~/components/ui/table"
import { Game } from "~/data/games"
import { Player } from "~/data/players"

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

export const GamesTableFooter = ({ games }: { games: Game[] }) => {
  const gamesByPlayers = getgamesByPlayers(games)

  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={4}>
          <div className="flex items-center gap-4">
            Count:
            {Object.values(gamesByPlayers).map(({ count, player }) => (
              <div key={player.id} className="inline-flex items-center gap-1">
                <Swatch color={player.color} size="sm" />
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

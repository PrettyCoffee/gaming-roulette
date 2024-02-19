import { reduxDevtools } from "@yaasl/devtools"
import {
  atom,
  localStorage,
  useAtom,
  migration,
  createMigrationStep,
} from "@yaasl/react"

const createId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(10)))
    .map(n => n.toString(36))
    .join("")
    .toUpperCase()

const gamesA = [
  "Journey",
  "Firewatch",
  "Storyteller",
  "To the Moon",
  "VVVVVV",
  "VVVVVV",
  "FEZ",
  "Oxenfree",
  "Spirit of the North",
]

const gamesB = [
  "Baba is You",
  "Fausts Alptraum",
  "Pseudoregalia",
  "Lil Gator Game",
  "Later Alligator",
  "Melatonin",
  "Hatoful Boyfriend",
  "Undungeon",
  "Eldest Souls",
  "Papers, Please",
]

interface PlayersV0 {
  player1: { name: string; games: string[] }
  player2: { name: string; games: string[] }
}

const v1Migration = createMigrationStep({
  previous: null,
  version: "1",
  migrate: (old: PlayersV0) => {
    console.log({ old })
    return [
      {
        id: "1",
        color: "red",
        name: old.player1.name,
        games: old.player1.games,
      },
      {
        id: "2",
        color: "blue",
        name: old.player2.name,
        games: old.player2.games,
      },
    ]
  },
  validate: (old: unknown): old is PlayersV0 =>
    old != null &&
    typeof old === "object" &&
    "player1" in old &&
    "player2" in old,
})

export interface Player {
  id: string
  name: string
  color: string
  games: string[]
}

const playersAtom = atom<Player[]>({
  name: "players",
  defaultValue: [
    {
      id: "1",
      name: "Player 1",
      games: gamesA,
      color: "red",
    },
    {
      id: "2",
      name: "Player 2",
      games: gamesB,
      color: "blue",
    },
  ],
  middleware: [
    localStorage(),
    migration({ steps: [v1Migration] }),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const usePlayers = () => {
  const [players, setPlayers] = useAtom(playersAtom)

  const addPlayer = (name: string, color: string) => {
    const newPlayer = { name, color, id: createId(), games: [] }
    setPlayers(data => [...data, newPlayer])
  }
  const removePlayer = (id: string) =>
    setPlayers(data => data.filter(player => player.id !== id))

  const setPlayerAttribute = <Attribute extends keyof Omit<Player, "id">>(
    id: string,
    attribute: Attribute,
    value: Player[Attribute]
  ) =>
    setPlayers(data =>
      data.map(player =>
        player.id !== id ? player : { ...player, [attribute]: value }
      )
    )

  return { players, addPlayer, removePlayer, setPlayerAttribute }
}

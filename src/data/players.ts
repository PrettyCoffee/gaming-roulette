import { reduxDevtools } from "@yaasl/devtools"
import {
  atom,
  localStorage,
  useAtom,
  derive,
  useDeriveValue,
} from "@yaasl/react"

const createId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(10)))
    .map(n => n.toString(36))
    .join("")
    .toUpperCase()

export const gamesA = [
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

export const gamesB = [
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

export interface Player {
  id: string
  name: string
  color: string
  games: string[]
}

const playersAtom = atom<Player[]>({
  name: "players",
  defaultValue: [],
  middleware: [
    localStorage(),
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

const arrayHasDuplicate = (items: string[]) =>
  items.some((item, index) => items.indexOf(item) !== index)

const arraysOverlap = (...arrays: string[][]) => {
  return arrays.some((array, index) => {
    const others = arrays.slice(index + 1).flat()
    return array.some(item => others.includes(item))
  })
}

export const playerGameStats = derive(({ get }) => {
  const players = get(playersAtom)
  const allGames = players.map(({ games }) => games)

  return Object.fromEntries(
    players.map(player => [
      player.id,
      {
        hasDuplicates: arrayHasDuplicate(player.games),
        hasCrossDuplicates: arraysOverlap(...allGames),
        games: player.games.length,
      },
    ])
  )
})

export const usePlayerGameStats = () => useDeriveValue(playerGameStats)

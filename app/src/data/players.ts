import { atom, localStorage, reduxDevtools, useAtom } from "yaasl/react"

const gamesA = [
  "Baba is You",
  "Fausts Alptraum",
  "Pseudoregalia",
  "Lil Gator Game",
  "The Murder of Sonic the Hedgehog",
  "Later Alligator",
  "Melatonin",
  "Hatoful Boyfriend",
  "Undungeon",
  "Eldest Souls",
]

const gamesB = [
  "Journey",
  "Firewatch",
  "Limbo",
  "Everlasting Summer",
  "VVVVVV",
  "VVVVVV",
  "FEZ",
  "One Step From Edenlea",
  "Oxenfree",
  "Blaster Master Zero",
]

interface Player {
  name: string
  games: string[]
}

interface Players {
  player1: Player
  player2: Player
}

const playersAtom = atom<Players>({
  name: "players",
  defaultValue: {
    player1: {
      name: "Player 1",
      games: gamesA,
    },
    player2: {
      name: "Player 2",
      games: gamesB,
    },
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const usePlayers = () => {
  const [players, setPlayers] = useAtom(playersAtom)

  const setPlayerAttribute = <Attribute extends keyof Player>(
    player: keyof Players,
    attribute: Attribute,
    value: Player[Attribute]
  ) => {
    setPlayers(data => {
      const next = { ...data }
      next[player] = { ...next[player], [attribute]: value }
      return next
    })
  }

  return { players, setPlayers, setPlayerAttribute }
}

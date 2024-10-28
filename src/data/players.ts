import { localStorage, useAtom, useAtomValue, createSlice } from "lib/yaasl"
import { arrayHasDuplicate, arraysIntersect } from "utils/array"
import { ColorValue } from "utils/colors"
import { createId } from "utils/createId"

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
  color: ColorValue
  games: string[]
}

export const playersSlice = createSlice({
  name: "players",
  defaultValue: [] as Player[],
  effects: [localStorage()],

  reducers: {
    add: (state, name: string, color: ColorValue) => [
      ...state,
      { name, color, id: createId(), games: [] },
    ],
    edit: (state, id: string, data: Partial<Player>) =>
      state.map(player => (player.id === id ? { ...player, ...data } : player)),
    remove: (state, id: string) => state.filter(player => player.id !== id),
  },

  selectors: {
    gameStats: players => {
      const allGames = players.map(({ games }) => games)

      return Object.fromEntries(
        players.map(player => [
          player.id,
          {
            hasDuplicates: arrayHasDuplicate(player.games),
            hasCrossDuplicates: arraysIntersect(...allGames),
            games: player.games.length,
          },
        ])
      )
    },
  },
})

const setPlayerAttribute = <Attribute extends keyof Omit<Player, "id">>(
  id: string,
  attribute: Attribute,
  value: Player[Attribute]
) => playersSlice.actions.edit(id, { [attribute]: value })

export const usePlayers = () => {
  const [players, setPlayers] = useAtom(playersSlice)

  return {
    players,
    setPlayers,
    setPlayerAttribute,
    addPlayer: playersSlice.actions.add,
    removePlayer: playersSlice.actions.remove,
  }
}

export const usePlayerGameStats = () =>
  useAtomValue(playersSlice.selectors.gameStats)

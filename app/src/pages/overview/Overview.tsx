import { useGames } from "~/data/games"

export const Overview = () => {
  const { games } = useGames()

  console.log(games)

  return (
    <div className="px-2">
      <div className="grid grid-cols-[repeat(8,auto)] whitespace-nowrap overflow-x-auto min-w-full">
        <div className="col-span-1 font-bold">Name</div>
        <div className="col-span-1 font-bold">Date</div>
        <div className="col-span-2 font-bold">Online</div>
        <div className="col-span-2 font-bold">Player 1</div>
        <div className="col-span-2 font-bold">Player 2</div>

        {games?.map(game => (
          <>
            <div className="col-span-1">{game.name}</div>
            <div className="col-span-1">{game.date}</div>
            <div className="col-span-1">{game.online.playtime}</div>
            <div className="col-span-1">{game.online.rating}</div>
            <div className="col-span-1">{game.player1.playtime}</div>
            <div className="col-span-1">{game.player1.rating}</div>
            <div className="col-span-1">{game.player2.playtime}</div>
            <div className="col-span-1">{game.player2.rating}</div>
          </>
        ))}
      </div>
    </div>
  )
}

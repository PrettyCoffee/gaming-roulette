import { Fragment, PropsWithChildren } from "react"

import { Text } from "~/components/base/Text"
import { useGameStats, useGames } from "~/data/games"
import { usePlayers } from "~/data/players"
import { Ruleset, useRuleset } from "~/data/ruleset"
import { ClassNameProp } from "~/types/BaseProps"
import { DAY, readableTime } from "~/utils/date"
import { cn } from "~/utils/utils"

const isString = (value: unknown): value is string => typeof value === "string"
const Surface = ({
  title,
  children,
  className,
}: PropsWithChildren<{ title?: string } & ClassNameProp>) => (
  <div className={cn("p-1", className)}>
    <div className="flex h-full flex-col overflow-hidden rounded-md bg-zinc-700/25 px-3 py-2 shadow-medium">
      {title && (
        <Text asChild size="xs" color="muted" bold>
          <h3>{title}</h3>
        </Text>
      )}
      <div className="-mr-2 overflow-y-auto pr-2">{children}</div>
    </div>
  </div>
)

const Kpi = ({ title, value }: { title: string; value: string }) => (
  <Surface title={title}>
    <Text size="md" noOverflow noWrap>
      {value}
    </Text>
  </Surface>
)

const Greeting = () => {
  const { players } = usePlayers()
  return (
    <Text asChild size="3xl">
      <h2>
        Welcome{" "}
        {players.map((player, index) => (
          <Fragment key={player.id}>
            <Text gradient={{ from: player.color as "red" }} bold>
              {player.name}
            </Text>
            {index === players.length - 2
              ? " & "
              : index !== players.length - 1 && ", "}
          </Fragment>
        ))}
        <b>{" !"}</b>
      </h2>
    </Text>
  )
}

const dayOfYear = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / DAY)
}
const QuoteOfTheDay = () => {
  const quotes = [
    <>
      Let the magic of{" "}
      <Text gradient={{ from: "green" }} bold>
        gam(bl)ing addiction
      </Text>{" "}
      happen!
    </>,
    <>
      Time to spin the{" "}
      <Text gradient={{ from: "red" }} bold>
        Gaming Roulette
      </Text>
      !
    </>,
    <>
      Are you ready for some{" "}
      <Text gradient={{ from: "blue" }} bold>
        gambling
      </Text>
      ?
    </>,
    <>
      You should probably spin the{" "}
      <Text gradient={{ from: "fuchsia" }} bold>
        wheeeeeel
      </Text>
      !
    </>,
  ]
  const item = dayOfYear() % quotes.length
  return <Text>{quotes[item]}</Text>
}
const getAllRules = ({
  additional,
  allowCrossDuplicates,
  allowDuplicates,
  gamesPerPerson,
}: Ruleset) =>
  [
    `Max ${gamesPerPerson} games per player`,
    !allowDuplicates && "No duplicates",
    !allowCrossDuplicates && "No cross-duplicates",
    ...additional,
  ].filter(isString)

const Rules = () => {
  const [ruleset] = useRuleset()
  const rules = getAllRules(ruleset)

  return (
    <Surface title="Ruleset">
      <ul className="max-w-60">
        {rules.map(rule => (
          <Text key={rule} asChild size="md" noOverflow noWrap>
            <li className="max-w-60">{rule}</li>
          </Text>
        ))}
      </ul>
    </Surface>
  )
}

const Games = () => {
  const { games } = useGames()
  const currentGame = games[games.length - 1]
  const latestGames = games.slice(games.length - 6, games.length - 1).reverse()
  return (
    <div className="flex flex-col">
      <Surface title="Current game">
        <Text
          size="xl"
          bold
          noOverflow
          noWrap
          className="inline-block max-w-48"
        >
          {currentGame?.name ?? "-"}
        </Text>
      </Surface>
      <Surface title="Latest games" className="h-max">
        <ul className="max-w-48">
          {latestGames.map(({ name, id }) => (
            <Text key={id} asChild size="md" noOverflow noWrap>
              <li className="max-w-60">{name}</li>
            </Text>
          ))}
        </ul>
      </Surface>
    </div>
  )
}

const GameStats = () => {
  const { averageTime, playingSince, totalGames } = useGameStats()

  return (
    <div>
      <Kpi title="Total played" value={totalGames.toString()} />
      <Kpi title="Gambling since" value={readableTime(playingSince)} />
      <Kpi title="Average playtime" value={readableTime(averageTime, 1)} />
    </div>
  )
}

const Home = () => {
  return (
    <div className="flex h-full max-w-2xl flex-col gap-2">
      <Greeting />
      <QuoteOfTheDay />
      <div className="-mx-1 flex">
        <Games />
        <Rules />
        <GameStats />
      </div>
    </div>
  )
}

export default Home

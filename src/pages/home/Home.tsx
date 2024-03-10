import { Fragment, PropsWithChildren } from "react"

import { Text } from "~/components/base/Text"
import { useGames } from "~/data/games"
import { usePlayers } from "~/data/players"
import { Ruleset, useRuleset } from "~/data/ruleset"
import { DAY } from "~/utils/date"

const isString = (value: unknown): value is string => typeof value === "string"
const Surface = ({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) => (
  <div className="p-1">
    <div className="py-2 px-3 rounded-md bg-base/75 shadow-md flex flex-col overflow-hidden h-full">
      {title && (
        <Text asChild size="xs" color="muted" bold>
          <h3>{title}</h3>
        </Text>
      )}
      <div className="overflow-y-auto pr-2 -mr-2">{children}</div>
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
    <Text asChild size="3xl" className="mb-1">
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
  const games = useGames().games ?? []
  const currentGame = games[games.length - 1]
  const latestGames = games.slice(games.length - 6, games.length - 1).reverse()
  return (
    <div>
      <Surface title="Current game">
        <Text
          size="xl"
          color={(currentGame?.color ?? "default") as "default"}
          bold
          noOverflow
          noWrap
          className="inline-block max-w-48"
        >
          {currentGame?.name ?? "-"}
        </Text>
      </Surface>
      <Surface title="Latest games">
        <ul className="max-w-48">
          {latestGames.map(({ name }) => (
            <Text key={name} asChild size="md" noOverflow noWrap>
              <li className="max-w-60">{name}</li>
            </Text>
          ))}
        </ul>
      </Surface>
    </div>
  )
}

const weeksSince = (date?: string) => {
  if (!date) return 0
  const diff = Date.now() - new Date(date).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
}

const GameStats = () => {
  const games = useGames().games ?? []
  const totalGames = games.length
  const startDate = games[0]?.date ?? ""
  const averageTime = !games[0]
    ? 0
    : (weeksSince(games[0]?.date) / games.length).toFixed(2)

  return (
    <div>
      <Kpi title="Total played" value={totalGames.toString()} />
      <Kpi title="Gambling since" value={startDate} />
      <Kpi title="Weeks per game" value={averageTime.toString() + " weeks"} />
    </div>
  )
}

export const Home = () => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <Greeting />
      <QuoteOfTheDay />
      <div className="flex -mx-1 flex-1 overflow-hidden">
        <Games />
        <Rules />
        <GameStats />
      </div>
    </div>
  )
}

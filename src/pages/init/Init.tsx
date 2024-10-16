import { PropsWithChildren, useEffect, useState } from "react"

import { m } from "framer-motion"

import { Text } from "~/components/primitives/Text"
import { setHashRoute } from "~/components/utility/hash-router"
import { VisuallyHidden } from "~/components/utility/VisuallyHidden"
import { usePlayers } from "~/data/players"

import { Navigation } from "./Navigation"
import { Section } from "./Section"
import { ImportData } from "../settings/DataSettings"
import { PlayerSettings } from "../settings/PlayerSettings"
import {
  AdditionalRulesInput,
  DuplicateRules,
  GamesPerPersonInput,
  HandicapGraph,
  HandicapSlider,
} from "../settings/RulesetSettings"

interface StepProps {
  onContinue: () => void
  onFinish: () => void
}

const Intro = ({ onContinue, onFinish }: StepProps) => (
  <Section.Layout>
    <Section.Title>Welcome! 👋</Section.Title>
    <Section.Description>
      This is{" "}
      <Text gradient={{ from: "red", to: "blue" }} bold>
        Gaming Roulette
      </Text>
      , a tool to help you decide what game to play next. <br />
      Choose your games, click the button, and let the magic of{" "}
      <Text gradient={{ from: "green", to: "yellow" }} bold>
        gam(bl)ing addiction
      </Text>{" "}
      happen!
      <br />
      <br />
      Now, let&apos;s start with setting the app up. ✨
      <br />
      <br />
      Note: You can adjust all settings later on in the settings menu.
    </Section.Description>
    <div className="flex items-center gap-2">
      <Section.Next label="Let's go!" onClick={onContinue} />
      <ImportData label="Import data instead" onChange={onFinish} />
    </div>
  </Section.Layout>
)

const Users = ({ onContinue }: StepProps) => {
  const { players } = usePlayers()
  return (
    <Section.Layout>
      <Section.Title>Time to add the players!</Section.Title>
      <Section.Description>
        Playing alone? Or in a group? Add as many players as you want!
      </Section.Description>
      <div className="-mx-2 mt-2">
        <PlayerSettings />
      </div>
      <Section.Next
        label="That's all!"
        onClick={onContinue}
        disabled={players.length < 1}
      />
    </Section.Layout>
  )
}

const GamesAmount = ({ onContinue }: StepProps) => (
  <Section.Layout>
    <Section.Title>Your games</Section.Title>
    <Section.Description>
      How many games should be spinning? 5? 10? 42? Any number is viable!
    </Section.Description>
    <Section.Content>
      <GamesPerPersonInput />
      <div className="pt-2" />
      <DuplicateRules />
    </Section.Content>
    <Section.Next label="This is fine." onClick={onContinue} />
  </Section.Layout>
)

const Handicap = ({ onContinue }: StepProps) => (
  <Section.Layout>
    <Section.Title>Punishments 🔥</Section.Title>
    <Section.Description>
      When one player keeps winning all the time, that&apos;s no fun at all! Add
      a handicap to reduce the probability to win multiple times in a row.
    </Section.Description>
    <Section.Content>
      <div className="flex gap-8">
        <div className="flex-1">
          <HandicapSlider />
        </div>
        <HandicapGraph />
      </div>
    </Section.Content>
    <Section.Description>
      Note: The <b>higher</b> the handicap value, the <b>lower</b> the
      probability to win. The more games won successively, the higher the
      handicap. (see the graph)
    </Section.Description>
    <Section.Next label="This is fine." onClick={onContinue} />
  </Section.Layout>
)

const AdditionalRules = ({ onContinue }: StepProps) => (
  <Section.Layout>
    <Section.Title>Are there any additional rules?</Section.Title>
    <Section.Description>
      Define some additional rules you want to apply to your gaming roulette.
      These rules won&apos;t be enforced but can be used to spice things up a
      bit!
    </Section.Description>
    <Section.Content>
      <AdditionalRulesInput />
    </Section.Content>
    <Section.Next label="Finish up!" onClick={onContinue} />
  </Section.Layout>
)

const Finish = ({ onContinue }: StepProps) => (
  <Section.Layout>
    <Section.Title>That&apos;s it!</Section.Title>
    <Section.Description>
      Now that that&apos;s settled, I wish you good luck and lot&apos;s of fun
      with spinning the {""}
      <Text gradient={{ from: "red", to: "blue" }} bold>
        Gaming Roulette
      </Text>
      ! 🍀
      <br />
      <br />
      By the way, there are some more{" "}
      <Text gradient={{ from: "green", to: "orange" }} bold>
        awesome
      </Text>{" "}
      settings you can adjust in the settings menu! Check them out if you want
      to.
    </Section.Description>
    <Section.Next label="Let's start spinning!" onClick={onContinue} />
  </Section.Layout>
)

const hidden = {
  opacity: 0,
  display: "none",
}
const down = {
  opacity: 0,
  transform: "translateY(100%)",
  transitionEnd: {
    display: "none",
  },
}
const show = {
  opacity: 1,
  transform: "translateY(0%)",
  display: "block",
}
const up = {
  opacity: 0,
  transform: "translateY(-100%)",
  transitionEnd: {
    display: "none",
  },
}

const Slide = ({
  children,
  state,
}: PropsWithChildren<{ state: "up" | "down" | "show" }>) => (
  <m.div
    className="absolute inset-0 z-10 overflow-y-auto p-4 pr-8"
    variants={{ down, show, up }}
    animate={state}
    initial={hidden}
  >
    {children}
  </m.div>
)

const initSteps = [Intro, Users, GamesAmount, Handicap, AdditionalRules, Finish]

interface InitProps {
  onFinish: () => void
}

export const Init = ({ onFinish }: InitProps) => {
  const [step, setStep] = useState(0)
  const [availableStep, setAvailableStep] = useState(0)
  const maxStep = initSteps.length - 1

  useEffect(() => {
    setHashRoute("")
  }, [])

  const goBack = () => {
    setStep(Math.max(step - 1, 0))
  }
  const goNext = () => {
    const nextStep = step + 1
    setStep(Math.min(nextStep, maxStep))
    if (availableStep < nextStep) {
      setAvailableStep(nextStep)
    }
    if (nextStep > maxStep) {
      onFinish()
    }
  }

  const getState = (index: number) => {
    if (index === step) {
      return "show"
    } else if (index < step) {
      return "up"
    } else {
      return "down"
    }
  }

  return (
    <div className="h-full p-2 pt-0 ">
      <div className="relative h-full overflow-hidden rounded-md bg-background">
        <VisuallyHidden>
          <h1>Gaming Roulette Setup</h1>
        </VisuallyHidden>

        <Navigation
          current={step}
          progress={availableStep}
          steps={initSteps.length}
          goBack={goBack}
          goNext={goNext}
        />

        {initSteps.map((Step, index) => (
          <Slide key={Step.name} state={getState(index)}>
            <Step onContinue={goNext} onFinish={onFinish} />
          </Slide>
        ))}
      </div>
    </div>
  )
}

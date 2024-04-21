import { PropsWithChildren, useEffect, useState } from "react"

import { m } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Text } from "~/components/base/Text"
import { VisuallyHidden } from "~/components/base/VisuallyHidden"
import { IconButton } from "~/components/IconButton"
import { usePlayers } from "~/data/players"

import { Section } from "./Section"
import { ImportData } from "../settings/DataSettings"
import { PlayerSettings } from "../settings/PlayerSettings"
import { RulesetSettings } from "../settings/RulesetSettings"

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

const Ruleset = ({ onContinue }: StepProps) => (
  <Section.Layout>
    <Section.Title>What are your rules?</Section.Title>
    <Section.Description>
      How many games should be spinning? 5? 10? 42? Any number is viable! Are
      duplicates allowed? Are there any additional rules? Take your time and
      define a ruleset.
    </Section.Description>
    <div className="-ml-2 mt-2 w-full">
      <RulesetSettings />
    </div>
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

interface NavigationProps {
  current: number
  steps: number
  goBack: () => void
  goNext: () => void
}
const Navigation = ({ current, goBack, goNext, steps }: NavigationProps) => (
  <div className="absolute right-2 top-2 z-20 flex flex-col">
    <IconButton
      size="sm"
      icon={ArrowUp}
      title="Go back"
      titleSide="left"
      onClick={goBack}
      disabled={current === 0}
    />
    <IconButton
      size="sm"
      icon={ArrowDown}
      title="Go forward"
      titleSide="left"
      onClick={goNext}
      disabled={current === steps}
    />
  </div>
)

const initSteps = [Intro, Users, Ruleset, Finish]

interface InitProps {
  onFinish: () => void
}

export const Init = ({ onFinish }: InitProps) => {
  const [step, setStep] = useState(0)
  const [availableStep, setAvailableStep] = useState(0)
  const maxStep = initSteps.length - 1

  useEffect(() => {
    location.hash = ""
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
          steps={availableStep}
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

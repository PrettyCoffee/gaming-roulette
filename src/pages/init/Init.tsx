import { PropsWithChildren, useEffect, useState } from "react"

import { m } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Text } from "~/components/base/Text"
import { VisuallyHidden } from "~/components/base/VisuallyHidden"
import { IconButton } from "~/components/IconButton"
import { Button } from "~/components/ui/button"
import { usePlayers } from "~/data/players"

import { PlayerSettings } from "../settings/PlayerSettings"
import { RulesetSettings } from "../settings/RulesetSettings"

const Title = ({ children }: PropsWithChildren) => (
  <Text asChild size="3xl">
    <h2>{children}</h2>
  </Text>
)

const Description = ({ children }: PropsWithChildren) => (
  <Text asChild className="max-w-prose">
    <p>{children}</p>
  </Text>
)

interface ActionProps {
  label: string
  onClick: () => void
  disabled?: boolean
}
const NextAction = ({ label, onClick, disabled }: ActionProps) => (
  <Button onClick={onClick} variant="outline" disabled={disabled}>
    {label}
  </Button>
)

const Section = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-2 items-start">{children}</div>
)

interface StepProps {
  onContinue: () => void
}

const Intro = ({ onContinue }: StepProps) => (
  <Section>
    <Title>Welcome! 👋</Title>
    <Description>
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
    </Description>
    <NextAction label="Let's go!" onClick={onContinue} />
  </Section>
)

const Users = ({ onContinue }: StepProps) => {
  const { players } = usePlayers()
  return (
    <Section>
      <Title>Time to add the players!</Title>
      <Description>
        Playing alone? Or in a group? Add as many players as you want!
      </Description>
      <div className="-mx-2 mt-2">
        <PlayerSettings />
      </div>
      <NextAction
        label="That's all!"
        onClick={onContinue}
        disabled={players.length < 1}
      />
    </Section>
  )
}

const Ruleset = ({ onContinue }: StepProps) => (
  <Section>
    <Title>What are your rules?</Title>
    <Description>
      How many games should be spinning? 5? 10? 42? Any number is viable! Are
      duplicates allowed? Are there any additional rules? Take your time and
      define a ruleset.
    </Description>
    <div className="-ml-2 mt-2">
      <RulesetSettings />
    </div>
    <NextAction label="Finish up!" onClick={onContinue} />
  </Section>
)

const Finish = ({ onContinue }: StepProps) => (
  <Section>
    <Title>That&apos;s it!</Title>
    <Description>
      Now that that&apos;s settled, I wish you good luck and lot&apos;s of fun
      with spinning the {""}
      <Text gradient={{ from: "red", to: "blue" }} bold>
        Gaming Roulette
      </Text>
      ! 🍀
    </Description>
    <NextAction label="Let's start spinning!" onClick={onContinue} />
  </Section>
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
    className="absolute inset-0 p-4 pr-8 overflow-y-auto z-10"
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
  <div className="absolute top-2 right-2 z-20 flex flex-col">
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
      <div className="relative overflow-hidden bg-background rounded-md h-full">
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
            <Step onContinue={goNext} />
          </Slide>
        ))}
      </div>
    </div>
  )
}

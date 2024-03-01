import { PropsWithChildren, useEffect, useState } from "react"

import styled from "@emotion/styled"
import { m } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"

import { VisuallyHidden } from "~/components/base/VisuallyHidden"
import { IconButton } from "~/components/IconButton"
import { Button } from "~/components/ui/button"
import { usePlayers } from "~/data/players"

import { GamesPerPersonInput } from "../settings/GeneralSettings"
import { PlayerSettings } from "../settings/PlayerSettings"

const GradientText = styled.b`
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

interface StepProps {
  onContinue: () => void
}

const Intro = ({ onContinue }: StepProps) => (
  <>
    <h2 className="text-3xl mb-2">Welcome! 👋</h2>
    <div>
      This is{" "}
      <GradientText className="font-bold bg-gradient-to-r from-red-300 to-blue-300">
        Gaming Roulette
      </GradientText>
      , a tool to help you decide what game to play next. <br />
      Choose your games, click the button, and let the magic of{" "}
      <GradientText className="font-bold bg-gradient-to-r from-green-300 to-yellow-300">
        gam(bl)ing addiction
      </GradientText>{" "}
      happen!
      <br />
      <br />
      Now, let&apos;s start with setting the app up. ✨
    </div>
    <br />
    <Button onClick={onContinue} variant="outline">
      Let&apos;s go!
    </Button>
  </>
)

const Users = ({ onContinue }: StepProps) => {
  const { players } = usePlayers()
  return (
    <>
      <h2 className="text-3xl mb-2">Time to add the players!</h2>
      <div>Playing alone? Or in a group? Add as many players as you want!</div>
      <div className="-mx-2 mt-4 mb-2">
        <PlayerSettings />
      </div>
      <Button
        onClick={onContinue}
        variant="outline"
        disabled={players.length < 1}
      >
        That&apos;s all!
      </Button>
    </>
  )
}

const GamesPerPerson = ({ onContinue }: StepProps) => (
  <div>
    <h2 className="text-3xl mb-2">Last but not least:</h2>
    <div>
      How many games should be spinning? 5? 10? 42? Any number is viable!
    </div>
    <div className="max-w-40 mt-4 mb-2">
      <GamesPerPersonInput />
    </div>
    <div className="mt-4 mb-2">
      Now that that&apos;s settled, I wish you good luck and lot&apos;s of fun
      with spinning the {""}
      <GradientText className="font-bold bg-gradient-to-r from-red-300 to-blue-300 line-through">
        Gaming Roulette
      </GradientText>
      ! 🍀
    </div>
    <Button onClick={onContinue} variant="outline">
      Let&apos;s start spinning!
    </Button>
  </div>
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

const Section = ({
  children,
  state,
}: PropsWithChildren<{ state: "up" | "down" | "show" }>) => (
  <m.div
    className="absolute inset-0 p-4 pr-8 overflow-y-auto text-md z-10"
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

const initSteps = [Intro, Users, GamesPerPerson]

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
    <div className="relative h-full overflow-hidden bg-background m-2 mt-0 rounded-md">
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
        <Section key={Step.name} state={getState(index)}>
          <Step onContinue={goNext} />
        </Section>
      ))}
    </div>
  )
}

import { PropsWithChildren } from "react"

import { Button } from "~/components/buttons/Button"
import { Text } from "~/components/primitives/Text"

const Title = ({ children }: PropsWithChildren) => (
  <Text asChild size="3xl" className="mb-2">
    <h2>{children}</h2>
  </Text>
)

const Description = ({ children }: PropsWithChildren) => (
  <Text asChild className="mb-4 max-w-prose">
    <p>{children}</p>
  </Text>
)

const Content = ({ children }: PropsWithChildren) => (
  <div className="mb-4 w-full max-w-prose">{children}</div>
)

interface ActionProps {
  label: string
  onClick: () => void
  disabled?: boolean
}
const Next = ({ label, onClick, disabled }: ActionProps) => (
  <Button onClick={onClick} variant="key" disabled={disabled}>
    {label}
  </Button>
)

const Layout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-start">{children}</div>
)

export const Section = {
  Layout,
  Title,
  Description,
  Content,
  Next,
}

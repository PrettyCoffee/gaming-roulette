import { PropsWithChildren } from "react"

import { Text } from "~/components/base/Text"
import { Button } from "~/components/ui/button"

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
const Next = ({ label, onClick, disabled }: ActionProps) => (
  <Button onClick={onClick} variant="key" disabled={disabled}>
    {label}
  </Button>
)

const Layout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-start gap-2">{children}</div>
)

export const Section = {
  Layout,
  Title,
  Description,
  Next,
}

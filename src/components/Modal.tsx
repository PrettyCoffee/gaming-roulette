import { PropsWithChildren } from "react"

import { ClassNameProp } from "./base/BaseProps"
import { Button } from "./ui/button"
import { Dialog } from "./ui/dialog"

interface ModalAction {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface ModalProps extends ClassNameProp {
  open: boolean
  title: string
  description: string | JSX.Element
  confirm: ModalAction
  cancel: ModalAction
}
export const Modal = ({
  className,
  open,
  title,
  description,
  cancel,
  confirm,
  children,
}: PropsWithChildren<ModalProps>) => (
  <Dialog.Root open={open} onOpenChange={open => !open && cancel.onClick()}>
    <Dialog.Content className={className}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      {children && <div>{children}</div>}
      <Dialog.Footer>
        <Button {...cancel} variant="ghost">
          {cancel.label}
        </Button>
        <Button {...confirm} variant="outline">
          {confirm.label}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
)

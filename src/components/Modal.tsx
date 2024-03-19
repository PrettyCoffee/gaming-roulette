import { PropsWithChildren } from "react"

import { ClassNameProp } from "./base/BaseProps"
import { Button, ButtonProps } from "./ui/button"
import { Dialog } from "./ui/dialog"

interface ModalAction {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: ButtonProps["variant"]
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
        <Button variant="ghost" {...cancel}>
          {cancel.label}
        </Button>
        <Button variant="key" {...confirm}>
          {confirm.label}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
)

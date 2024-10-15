import { PropsWithChildren } from "react"

import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { Button, ButtonProps } from "./buttons/Button"
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
    <Dialog.Content className={cn("grid-rows-[auto_1fr_auto]", className)}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      {children && <div className="-m-2 overflow-auto p-2">{children}</div>}
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

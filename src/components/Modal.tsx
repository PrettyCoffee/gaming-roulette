import { PropsWithChildren } from "react"

import { ClassNameProp } from "./base/BaseProps"
import { Button } from "./ui/button"
import { Dialog } from "./ui/dialog"

interface ModalProps extends ClassNameProp {
  open: boolean
  title: string
  description: string | JSX.Element
  onConfirm: () => void
  onCancel: () => void
}
export const Modal = ({
  className,
  open,
  title,
  description,
  onCancel,
  onConfirm,
  children,
}: PropsWithChildren<ModalProps>) => (
  <Dialog.Root open={open} onOpenChange={open => !open && onCancel()}>
    <Dialog.Content className={className}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      {children && <div>{children}</div>}
      <Dialog.Footer>
        <Button onClick={onCancel} variant="ghost">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="outline">
          Confirm
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
)

import { ClassNameProp } from "./base/BaseProps"
import { Button } from "./ui/button"
import { Dialog } from "./ui/dialog"

interface ConfirmationProps extends ClassNameProp {
  open: boolean
  title: string
  description: string | JSX.Element
  onConfirm: () => void
  onCancel: () => void
}
export const Confirmation = ({
  className,
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmationProps) => (
  <Dialog.Root open={open} onOpenChange={open => !open && onCancel()}>
    <Dialog.Content className={className}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
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

import { Dispatch } from "react"

import { Upload } from "lucide-react"

import { ClassNameProp } from "types/BaseProps"
import { cn } from "utils/utils"

import { Button, ButtonProps } from "../buttons/Button"
import { Icon } from "../primitives/Icon"

interface FileInputProps extends ClassNameProp, Pick<ButtonProps, "variant"> {
  label: string
  onChange: Dispatch<File>
  accept?: string
  multiple?: boolean
}

export const FileInput = ({
  label,
  onChange,
  variant,
  className,
  accept,
  multiple,
}: FileInputProps) => (
  <Button asChild variant={variant}>
    <label className={cn("cursor-pointer select-none", className)}>
      <input
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        onChange={({ target }) => {
          const file = target.files?.item(0)
          if (file) onChange(file)
        }}
      />
      <Icon icon={Upload} />
      {label}
    </label>
  </Button>
)

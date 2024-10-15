import { Dispatch } from "react"

import { Upload } from "lucide-react"

import { cn } from "~/utils/utils"

import { ClassNameProp } from "./base/BaseProps"
import { Button, ButtonProps } from "./buttons/Button"
import { Icon } from "./Icon"

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

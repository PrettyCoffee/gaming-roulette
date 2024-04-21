import { PropsWithChildren } from "react"

import { Info } from "lucide-react"

import { textColor } from "~/utils/colors"

import { Icon } from "./Icon"
import { TitleTooltip } from "./TitleTooltip"

export const InfoHint = ({ children }: PropsWithChildren) => (
  <TitleTooltip title={children as string} asChild>
    <span className="inline-flex size-8 items-center justify-center">
      <Icon
        icon={Info}
        color="current"
        size="sm"
        className={textColor({ color: "blue" })}
      />
    </span>
  </TitleTooltip>
)

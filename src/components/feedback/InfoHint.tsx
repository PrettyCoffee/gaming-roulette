import { PropsWithChildren } from "react"

import { Info } from "lucide-react"

import { textColor } from "~/utils/colors"

import { TitleTooltip } from "./TitleTooltip"
import { Icon } from "../primitives/Icon"

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

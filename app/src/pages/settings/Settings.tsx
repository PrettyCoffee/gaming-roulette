import { Tabs } from "~/components/ui/tabs"

import { GeneralSettings } from "./GeneralSettings"
import { GithubSettings } from "./GithubSettings"
import { PlayerSettings } from "./PlayerSettings"

export const Settings = () => (
  <Tabs.Root defaultValue="general">
    <Tabs.List>
      <Tabs.Trigger value="general">General</Tabs.Trigger>
      <Tabs.Trigger value="players">Players</Tabs.Trigger>
      <Tabs.Trigger value="github">Github</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="general">
      <GeneralSettings />
    </Tabs.Content>

    <Tabs.Content value="players">
      <PlayerSettings />
    </Tabs.Content>

    <Tabs.Content value="github">
      <GithubSettings />
    </Tabs.Content>
  </Tabs.Root>
)

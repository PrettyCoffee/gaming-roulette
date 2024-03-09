import { Tabs } from "~/components/ui/tabs"

import { AudioSettings } from "./AudioSettings"
import { GeneralSettings } from "./GeneralSettings"
import { GithubSettings } from "./GithubSettings"
import { PlayerSettings } from "./PlayerSettings"
import { RulesetSettings } from "./RulesetSettings"

export const Settings = () => (
  <Tabs.Root defaultValue="general">
    <Tabs.List>
      <Tabs.Trigger value="general">General</Tabs.Trigger>
      <Tabs.Trigger value="audio">Audio</Tabs.Trigger>
      <Tabs.Trigger value="players">Players</Tabs.Trigger>
      <Tabs.Trigger value="ruleset">Ruleset</Tabs.Trigger>
      <Tabs.Trigger value="github">Github</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="general">
      <GeneralSettings />
    </Tabs.Content>

    <Tabs.Content value="audio">
      <AudioSettings />
    </Tabs.Content>

    <Tabs.Content value="players">
      <PlayerSettings />
    </Tabs.Content>

    <Tabs.Content value="ruleset">
      <RulesetSettings />
    </Tabs.Content>

    <Tabs.Content value="github">
      <GithubSettings />
    </Tabs.Content>
  </Tabs.Root>
)

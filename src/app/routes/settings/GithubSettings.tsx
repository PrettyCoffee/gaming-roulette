import { useId, useState } from "react"

import { Input } from "components/inputs/input"
import { InputLabel } from "components/inputs/InputLabel"
import { useGithub } from "data/github"

import { Grid } from "./Grid"
import { SyncGithub } from "./SyncGithub"

const RepoOwner = () => {
  const id = useId()
  const { repoOwner, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Repo owner
      </InputLabel>
      <Input
        id={id}
        value={repoOwner}
        onChange={({ target }) => setGithubAttribute("repoOwner", target.value)}
      />
    </>
  )
}

const RepoName = () => {
  const id = useId()
  const { repoName, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Repo name
      </InputLabel>
      <Input
        id={id}
        value={repoName}
        onChange={({ target }) => setGithubAttribute("repoName", target.value)}
      />
    </>
  )
}

const FilePath = () => {
  const id = useId()
  const { filePath, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        File path
      </InputLabel>
      <Input
        id={id}
        value={filePath}
        onChange={({ target }) => setGithubAttribute("filePath", target.value)}
      />
    </>
  )
}

const BranchName = () => {
  const id = useId()
  const { branch, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Branch name
      </InputLabel>
      <Input
        id={id}
        value={branch}
        onChange={({ target }) => setGithubAttribute("branch", target.value)}
      />
    </>
  )
}

const GithubToken = () => {
  const id = useId()
  const [showToken, setShowToken] = useState(false)

  const { token, setGithubAttribute } = useGithub()

  return (
    <>
      <InputLabel className="mb-2" htmlFor={id}>
        Github token
      </InputLabel>
      <Input
        id={id}
        type={showToken ? "text" : "password"}
        value={showToken || !token ? token : "xxxxxxxx"}
        onChange={({ target }) => setGithubAttribute("token", target.value)}
        onFocus={() => setShowToken(true)}
        onBlur={() => setShowToken(false)}
      />
    </>
  )
}

export const GithubSettings = () => (
  <Grid.Root>
    <Grid.Item>
      <RepoOwner />
    </Grid.Item>

    <Grid.Item>
      <RepoName />
    </Grid.Item>

    <Grid.Item>
      <BranchName />
    </Grid.Item>

    <Grid.Item>
      <FilePath />
    </Grid.Item>

    <Grid.Item>
      <GithubToken />
    </Grid.Item>

    <Grid.Item>
      <div className="pt-8" />
      <SyncGithub />
    </Grid.Item>
  </Grid.Root>
)

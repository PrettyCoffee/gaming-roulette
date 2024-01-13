import { useId, useState } from "react"

import { InputLabel } from "~/components/InputLabel"
import { Input } from "~/components/ui/input"
import { useGithub } from "~/data/github"

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
  <div className="grid grid-cols-2 gap-2 p-2 pt-0">
    <div className="col-span-1">
      <RepoOwner />
    </div>

    <div className="col-span-1">
      <RepoName />
    </div>

    <div className="col-span-1">
      <FilePath />
    </div>

    <div className="col-span-1">
      <GithubToken />
    </div>
  </div>
)

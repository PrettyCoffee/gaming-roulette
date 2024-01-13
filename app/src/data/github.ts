import { atom, reduxDevtools, useAtom, localStorage } from "yaasl/react"

interface GithubData {
  token: string
  repoOwner: string
  repoName: string
}

export const githubAtom = atom<GithubData>({
  name: "github",
  defaultValue: {
    token: "",
    repoOwner: "PrettyCoffee",
    repoName: "gaming-roulette",
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

export const useGithub = () => {
  const [github, setGithub] = useAtom(githubAtom)

  const setGithubAttribute = <Attribute extends keyof GithubData>(
    key: Attribute,
    value: GithubData[Attribute]
  ) => setGithub(prev => ({ ...prev, [key]: value }))

  return {
    ...github,
    setGithubAttribute,
  }
}

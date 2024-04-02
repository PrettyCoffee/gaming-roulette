import { reduxDevtools } from "@yaasl/devtools"
import { atom, useAtom, localStorage, useAtomValue } from "@yaasl/react"

interface GithubData {
  token: string
  repoOwner: string
  repoName: string
  filePath: string
  branch: string
}

export const githubAtom = atom<GithubData>({
  name: "github",
  defaultValue: {
    token: "",
    repoOwner: "PrettyCoffee",
    repoName: "gaming-roulette",
    branch: "data",
    filePath: "played.md",
  },
  middleware: [
    localStorage(),
    reduxDevtools({ disable: import.meta.env.PROD }),
  ],
})

const isIncomplete = (github: GithubData) =>
  !github.branch ||
  !github.filePath ||
  !github.repoName ||
  !github.repoOwner ||
  !github.token

export const useGithub = () => {
  const [github, setGithub] = useAtom(githubAtom)
  const incomplete = isIncomplete(github)

  const setGithubAttribute = <Attribute extends keyof GithubData>(
    key: Attribute,
    value: GithubData[Attribute]
  ) => setGithub(prev => ({ ...prev, [key]: value }))

  return {
    ...github,
    incomplete,
    setGithubAttribute,
  }
}

const showGithubOptions = atom({
  name: "showGithubOptions",
  defaultValue: false,
  middleware: [reduxDevtools({ disable: import.meta.env.PROD })],
})

const holding = { current: false }
let timeout: NodeJS.Timeout | undefined = undefined

const onMouseMove = () => {
  window.removeEventListener("mousemove", onMouseMove)
  clearTimeout(timeout)
  holding.current = false
}

export const onGithubMouseDown = () => {
  clearTimeout(timeout)

  holding.current = true
  window.addEventListener("mousemove", onMouseMove)

  timeout = setTimeout(() => {
    if (!holding.current) return
    showGithubOptions.set(prev => !prev)
  }, 3000)
}

export const useShowGithubOptions = () => useAtomValue(showGithubOptions)

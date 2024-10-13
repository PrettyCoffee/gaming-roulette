import { createAtom, useAtom, localStorage, useAtomValue } from "~/lib/yaasl"

interface GithubData {
  token: string
  repoOwner: string
  repoName: string
  filePath: string
  branch: string
}

export const githubAtom = createAtom<GithubData>({
  name: "github",
  defaultValue: {
    token: "",
    repoOwner: "PrettyCoffee",
    repoName: "gaming-roulette",
    branch: "data",
    filePath: "played.md",
  },
  effects: [localStorage()],
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

const showGithubOptions = createAtom({
  name: "showGithubOptions",
  defaultValue: false,
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

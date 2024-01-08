import { useEffect, useState } from "react"

interface GithubFile {
  owner: string
  repo: string
  branch: string
  path: string
}

const fetchGithubFile = ({ owner, repo, branch, path }: GithubFile) =>
  fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`).then(result => result.text())

export const Overview = () => {
  const [data, setData] = useState("")

  useEffect(() => {
    fetchGithubFile({
      owner: "PrettyCoffee",
      repo: "gaming-roulette",
      branch: "main",
      path: "played.md"
    })
      .then(setData)
  }, [])

  return <div>{data}</div>
}

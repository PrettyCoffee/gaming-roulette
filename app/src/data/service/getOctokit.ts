import { Octokit } from "octokit"

import { githubAtom } from "../github"

let octokit: Octokit | null = null
let lastToken: string | null = null

export const getOctokit = () => {
  const { token } = githubAtom.get()
  if (token === lastToken) {
    return octokit
  }

  octokit = new Octokit({
    auth: token,
  })
  lastToken = token
  return octokit
}

import { getOctokit } from "./getOctokit"
import { githubAtom } from "../github"

export const fetchRepoFile = async (path: string) => {
  const octokit = getOctokit()
  if (!octokit) {
    return null
  }

  return octokit.rest.repos
    .getContent({
      owner: githubAtom.get().repoOwner,
      repo: githubAtom.get().repoName,
      path,
      ref: githubAtom.get().branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then(({ data }) => {
      const { content } = data as unknown as { content: string }
      return atob(content)
    })
}

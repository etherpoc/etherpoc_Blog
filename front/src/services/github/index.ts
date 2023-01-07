import { Octokit } from "@octokit/rest";
import { GithubRepo, ParsedGithubRepo } from "types/data";

const getGithubRepos = async ():Promise<Array<ParsedGithubRepo>>=> {

    const octokit = new Octokit({
      auth: `${process.env.GITHUB_TOKEN}`
    });

    const res = await octokit.request(
      'GET /users/{username}/repos{?}',
      {
        username: 'etherpoc'
      }
    );
    const resItems = res.data as GithubRepo[];
    const dataList = await Promise.all(
        resItems.map(async (item: GithubRepo) => {
            const data:ParsedGithubRepo = {
              id: item.id,
              name: item.name,
              full_name: item.full_name,
              html_url: item.html_url,
              description: item.description,
              pushed_at: item.pushed_at,
              created_at: item.created_at,
              updated_at: item.updated_at,
              owner: {
                avatar_url: item.owner.avatar_url
              }
            }
            return data
        }),
      )
    return dataList
  }

  export default getGithubRepos
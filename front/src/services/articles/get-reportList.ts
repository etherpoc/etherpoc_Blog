import { Article, ApiContext } from 'types/data'
import { fetcher } from 'utils'

const getArticleList = async (context: ApiContext): Promise<Array<Article>> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/articles`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getArticleList

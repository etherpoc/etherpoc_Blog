import { Article, ApiContext } from 'types/data'
import { fetcher } from 'utils'

export type GetArticleParams = {
  id: number
}

const getArticle = async (
  context: ApiContext,
  { id }: GetArticleParams,
): Promise<Article> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/article/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getArticle

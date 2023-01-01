export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<any> => {
  const res = await fetch(resource, init)

  if (!res.ok) {
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました',
    )

    throw error
  }

  return res.json()
}

import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export const analysis_markdown = async (content: string) => {
  const markdownData = matter(content)
  const processedContent = await remark()
    .use(html)
    .process(markdownData.content)
  const contentHtml = processedContent.toString()
  return {
    markdownData: {
      data: markdownData.data,
      content: markdownData.content,
    },
    contentHtml: contentHtml,
  }
}

import styles from './style.module.scss'
import { Article } from 'types/data'

interface DetailArticleProps {
  article: Article
  markdown_data: any
}

const DetailArticle = ({ article, markdown_data }: DetailArticleProps) => {
  const created_at = new Date(article.created_at)
  const updated_at = new Date(article.updated_at)
  return (
    <>
      <div className={styles.main}>
        <div dangerouslySetInnerHTML={{ __html: markdown_data.contentHtml }} />
      </div>
    </>
  )
}

export default DetailArticle

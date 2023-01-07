import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'
import { ParsedQiitaItem} from "types/data";

interface SimpleArticleProps {
  article: ParsedQiitaItem
}

const SimpleArticle = ({article}: SimpleArticleProps) => {
  const imageRate = 0.2;
  const url = new URL(article.url);
  const created_at = new Date(article.created_at);
  const updated_at = new Date(article.updated_at);
  return (
    <>
      <div className={styles.main}>
        <Link href={`${article.url}`}>
        <div className={styles.head}>
          <div className={styles.title}>
            <h2>{article.title}</h2>
            <p>{url.origin}</p>
          </div>
          <div className={styles.date}>
            <span>created:</span>
            {created_at.toDateString()}
            <br />
            <span>updated:</span>
            {updated_at.toDateString()}
          </div>
          <Image
            src={article.ogpImageUrl}
            alt="Picture of the author"
            width={1200*imageRate}
            height={630*imageRate}
            className={styles.image}
          />
        </div>
        </Link>
      </div>
    </>
  )
}

export default SimpleArticle

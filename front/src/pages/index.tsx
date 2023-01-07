import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import SimpleReport from 'components/Article/Simple'
import Loading from 'components/UI/Loading'
import getQiitaArticles from 'services/qiita'
import { ParsedQiitaItem } from 'types/data'
import styles from "styles/Home.module.scss"

type WorkshopHomeProps = InferGetStaticPropsType<typeof getStaticProps>

const WorkshopHome: NextPage<WorkshopHomeProps> = ({
  articles,
}: WorkshopHomeProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout>
      <div className={styles.myArticle}>
        <h1>My Article</h1>
        {articles.map((article: ParsedQiitaItem) => {
          return (
            <>
              <SimpleReport article={article} />
            </>
          )
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let qiitaArticle = await getQiitaArticles();
  
  return {
    props: {
      articles: qiitaArticle,
    },
    revalidate: 60,
  }
}

export default WorkshopHome

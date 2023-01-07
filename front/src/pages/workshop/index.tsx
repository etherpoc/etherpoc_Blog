import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import SimpleArticle from 'components/Article/Simple'
import GithubRepo from 'components/Github/Repo'
import Loading from 'components/UI/Loading'
import getQiitaArticles from 'services/qiita'
import getGithubRepos from 'services/github'
import { ParsedQiitaItem, ParsedGithubRepo } from 'types/data'
import styles from "./style.module.scss"

type WorkshopHomeProps = InferGetStaticPropsType<typeof getStaticProps>

const WorkshopHome: NextPage<WorkshopHomeProps> = ({
  repos,
  articles,
}: WorkshopHomeProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout>
      <div className={styles.myProduct}>
        <h1>My Product</h1>
        {repos.map((repo: ParsedGithubRepo) => {
          return (
            <div id={`${repo.id}`} className={styles.ProductItem}>
              <GithubRepo repo={repo} />
            </div>
          )
        })}
      </div>

      <div className={styles.myArticle}>
        <h1>My Article</h1>
        {articles.map((article: ParsedQiitaItem) => {
          return (
            <div id={`${article.id}`} className={styles.ArticleItem}>
              <SimpleArticle article={article} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let githubRepos = await getGithubRepos();
  let qiitaArticles = await getQiitaArticles();
  
  return {
    props: {
      repos: githubRepos,
      articles: qiitaArticles,
    },
    revalidate: 60,
  }
}

export default WorkshopHome

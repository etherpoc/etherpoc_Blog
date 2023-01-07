import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import SimpleArticle from 'components/Article/Simple'
import Loading from 'components/UI/Loading'
import getQiitaArticles from 'services/qiita'
import { ParsedQiitaItem } from 'types/data'

type WorkshopHomeProps = InferGetStaticPropsType<typeof getStaticProps>

const WorkshopHome: NextPage<WorkshopHomeProps> = ({
  dataList,
}: WorkshopHomeProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout>
      {dataList.map((data: ParsedQiitaItem) => {
        return (
          <>
            <SimpleArticle data={data} />
          </>
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let qiitaArticles = await getQiitaArticles();
  
  return {
    props: {
      dataList: qiitaArticles,
    },
    revalidate: 60,
  }
}

export default WorkshopHome

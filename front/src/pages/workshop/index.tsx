import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import SimpleReport from 'components/Report/Simple'
import Loading from 'components/UI/Loading'
import getQiitaReports from 'services/qiita'
import { Report, ApiContext } from 'types/data'
import { analysis_markdown } from 'utils'

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
      {dataList.map((data: any) => {
        return (
          <>
            <SimpleReport data={data} />
          </>
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let qiitaReports = await getQiitaReports();
  
  return {
    props: {
      dataList: qiitaReports,
    },
    revalidate: 60,
  }
}

export default WorkshopHome

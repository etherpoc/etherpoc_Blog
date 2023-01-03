import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import SimpleReport from 'components/Report/Simple'
import Loading from 'components/UI/Loading'
import getReportList from 'services/reports/get-reportList'
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
            <SimpleReport report={data.report} markdown_data={data.markdown_data} />
          </>
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:3333',
  }
  const reportList = await getReportList(context)
  const dataList = await Promise.all(
    reportList.map(async (report: Report) => {
      const markdown_data = await analysis_markdown(report.content)
      return {
        report: report,
        markdown_data: markdown_data,
      }
    }),
  )
  return {
    props: {
      dataList: dataList,
    },
    revalidate: 60,
  }
}

export default WorkshopHome

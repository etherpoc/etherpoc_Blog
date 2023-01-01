import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import DetailReport from 'components/Report/Detail'
import Loading from 'components/UI/Loading'
import getReport from 'services/reports/get-report'
import getReportList from 'services/reports/get-reportList'
import { ApiContext } from 'types/data'
import { analysis_markdown } from 'utils'

type ReportIdProps = InferGetStaticPropsType<typeof getStaticProps>

const context: ApiContext = {
  apiRootUrl: process.env.API_BASE_URL || 'http://localhost:3333',
}

const ReportId: NextPage<ReportIdProps> = ({
  report,
  markdownData,
}: ReportIdProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }

  return (
    <Layout>{<DetailReport report={report} markdown_data={markdownData} />}</Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reportList = await getReportList(context)
  const paths = reportList.map((report) => {
    return { params: { id: String(report.id) } }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params) {
    throw new Error('params is undefined')
  }
  const reportId = Number(params.id)
  const report = await getReport(context, { id: reportId })
  const markdownData = await analysis_markdown(report.content)
  return {
    props: {
      report: report,
      markdownData: markdownData,
    },
    revalidate: 60,
  }
}

export default ReportId

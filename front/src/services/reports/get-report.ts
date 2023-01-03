import { Report, ApiContext } from 'types/data'
import { fetcher } from 'utils'

export type GetReportParams = {
  id: number
}

const getReport = async (
  context: ApiContext,
  { id }: GetReportParams,
): Promise<Report> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/report/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getReport

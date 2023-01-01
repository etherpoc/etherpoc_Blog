import { Report, ApiContext } from 'types/data'
import { fetcher } from 'utils'

const getReportList = async (context: ApiContext): Promise<Array<Report>> => {
  return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/reports`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default getReportList

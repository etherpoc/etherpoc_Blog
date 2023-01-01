import styles from './style.module.scss'
import { Report } from 'types/data'

interface DetailReportProps {
  report: Report
  markdown_data: any
}

const DetailReport = ({ report, markdown_data }: DetailReportProps) => {
  const created_at = new Date(report.created_at)
  const updated_at = new Date(report.updated_at)
  return (
    <>
      <div className={styles.main}>
        <div dangerouslySetInnerHTML={{ __html: markdown_data.contentHtml }} />
      </div>
    </>
  )
}

export default DetailReport

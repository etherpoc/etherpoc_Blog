import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'
import { Report } from 'types/data'
import { ParsedQiitaItem} from "types/data";

interface SimpleReportProps {
  data: ParsedQiitaItem
}

const SimpleReport = ({data}: SimpleReportProps) => {
  return (
    <>
      <div className={styles.main}>
        <Link href={`${data.url}`}>
        <Image
          src={data.ogpImageUrl}
          alt="Picture of the author"
          width={500}
          height={500}
        />
          <div className={styles.head}>
            <div className={styles.title}>
              <h3>{data.title}</h3>
            </div>
            <div className={styles.date}>
              <span>created:</span>
              {data.created_at}
              <br />
              <span>updated:</span>
              {data.updated_at}
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default SimpleReport

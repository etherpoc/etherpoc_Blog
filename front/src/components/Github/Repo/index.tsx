import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'
import { ParsedGithubRepo } from "types/data";

interface GithubRepoProps {
  repo: ParsedGithubRepo
}

const GithubRepo = ({repo}: GithubRepoProps) => {
  const imageRate = 0.2;
  const url = new URL(repo.html_url);
  const created_at = new Date(repo.created_at);
  const updated_at = new Date(repo.updated_at);
  return (
    <>
      <div className={styles.main}>
        <Link href={`${repo.html_url}`}>
        <div className={styles.head}>
          <div className={styles.title}>
            <h2>{repo.name}</h2>
            <p>{url.origin}</p>
          </div>
          <div className={styles.date}>
            <span>created:</span>
            {created_at.toDateString()}
            <br />
            <span>updated:</span>
            {updated_at.toDateString()}
          </div>
          <Image
            src={repo.owner.avatar_url}
            alt="Picture of the author"
            width={640*imageRate}
            height={640*imageRate}
            className={styles.image}
          />
        </div>
        </Link>
      </div>
    </>
  )
}

export default GithubRepo

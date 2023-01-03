import Link from 'next/link'
import styles from './style.module.scss'

const Header = () => {
  return (
    <>
      <header className={styles.main}>
        <Link href="/workshop" className={styles.title}>
          <h1>etherpocの工房</h1>
        </Link>
      </header>
    </>
  )
}

export default Header

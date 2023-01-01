import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'
import styles from './style.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title> Etherpoc&lsquo;s blog </title>
        <meta name="author" content="etherpoc" />
        <meta
          name="description"
          content="blog of etherpoc, by etherpoc, for etherpoc"
        />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout

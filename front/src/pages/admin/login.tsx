import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Layout from '../../components/Layout'

type LoginProps = InferGetStaticPropsType<typeof getStaticProps>

const Login: NextPage<LoginProps> = () => {
  return <Layout>ログイン画面なのだ。</Layout>
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  }
}

export default Login

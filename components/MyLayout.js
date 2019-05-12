import { Layout, Icon, BackTop } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const { Header, Content } = Layout

const MyLayout = ({ children, router: { pathname, back } }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{children.props.title}</title>
    </Head>
    <Layout>
      <Header className="header">
        {pathname !== '/' && (
          <div onClick={() => back()}>
            <a className="links" style={{ float: 'left' }}>
              <Icon type="left-circle" />
              <span>Go back</span>
            </a>
          </div>
        )}
        <Link href="/">
          <a className="links">
            <Icon type="home" />
            <span>Podcast</span>
          </a>
        </Link>
      </Header>
      <div>
        <BackTop>
          <div className="ant-back-top-inner">
            <span>UP</span>
            <Icon type="arrow-up" />
          </div>
        </BackTop>
      </div>
      <Content className="content">{children}</Content>
    </Layout>
  </>
)
export default withRouter(MyLayout)

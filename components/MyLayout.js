import { Layout, Icon } from 'antd'
import Link from 'next/link'
import Head from 'next/head'

import { withRouter } from 'next/router'

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
              <span>Volver</span>
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
      <Content className="content">{children}</Content>
    </Layout>
  </>
)
export default withRouter(MyLayout)

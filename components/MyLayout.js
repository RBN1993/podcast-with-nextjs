import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link'
import { withRouter } from 'next/router'

const { Header, Content } = Layout

const MyLayout = ({ children, router: { pathname, back } }) => (
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
)
export default withRouter(MyLayout)

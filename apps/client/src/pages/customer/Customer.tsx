import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Customer = () => {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export default Customer
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'
import heroSliderData from '../../assets/fake-data/hero-slider'

const Customer = () => {
  return (
    <Layout style={{ height: '200vh' }}>
      <Header></Header>
      <Content style={{ height: '200vh' }}>

      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export default Customer
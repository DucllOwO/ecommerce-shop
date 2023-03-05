import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'
import heroSliderData from '../../assets/fake-data/hero-slider'
import Home from './Home'
import HeaderCustom from './components/Header'
import FooterCustom from './components/Footer'

const Customer = () => {
  return (
    <Layout>
      <Header id='header' style={{ height: 'var(--header-height)' }}>
        <HeaderCustom />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ padding: 0, margin: 0 }}>
        <FooterCustom />
      </Footer>
    </Layout>
  )
}

export default Customer
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import HeaderCustom from './components/Header'
import FooterCustom from './components/Footer'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Customer = () => {
  return (
    <Layout style={{
      width: "100%",
      overflowX: 'hidden'
    }}>
      <Header>
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
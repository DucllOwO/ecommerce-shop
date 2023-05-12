import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, AuditOutlined } from '@ant-design/icons/lib/icons'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import AdminMenu from '../../components/AdminMenu'

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ width: "100%", height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <AdminMenu />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: 'white' }}>
          <span style={{ margin: '0 20px' }}>

            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={() => setCollapsed(prev => !prev)} /> : <MenuFoldOutlined onClick={() => setCollapsed(prev => !prev)} style={{ fontSize: 20 }} />}
          </span>
        </Header>
        <Scrollbars>
          <Content
            style={{
              padding: 20,
            }}
          >
            <Outlet />
          </Content>
        </Scrollbars>
      </Layout>
    </Layout>
  )
}

export default Admin
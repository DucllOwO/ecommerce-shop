import { UserOutlined } from '@ant-design/icons'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons/lib/icons'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Menu from 'antd/es/menu'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100%", width: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: 'white' }}>
          <span style={{ margin: '0 20px' }}>

            {collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={() => setCollapsed(prev => !prev)} /> : <MenuFoldOutlined onClick={() => setCollapsed(prev => !prev)} style={{ fontSize: 20 }} />}
          </span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
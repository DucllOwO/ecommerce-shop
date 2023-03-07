import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider, Image } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='svgBg centerflex'>
      <div className='auth_wrapper centerflex'>
        <Title level={4} style={{ marginBottom: 50 }}>Chào mừng bạn đến tới Yolo</Title>
        <Title level={2} style={{ marginBottom: 50 }}>Đăng nhập</Title>
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <div className='centerflex' style={{ flexDirection: 'column' }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>

          <a className='forgot-password-txt'>Quên mật khẩu</a>
        </div>
        <Divider plain>Hoặc đăng nhập bằng</Divider>
        <Button type='link' style={{ marginBottom: 'auto' }}>
          <Image src='https://bizweb.dktcdn.net/100/438/408/themes/897269/assets/ic_btn_google.svg?1678162315584' preview={false} style={{ border: '1px solid var(--border-color)', borderRadius: 30 }} />
        </Button>

        <div className='sign-up-wrapper'>
          <span className='sign-up-wrapper-txt'>Bạn chưa có tài khoản?</span>
          <Link className='sign-up-wrapper-link' to={'/signup'}>  Đăng ký ngay!</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
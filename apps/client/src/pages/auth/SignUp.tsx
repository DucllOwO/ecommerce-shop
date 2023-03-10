import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider, Image } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='svgBg centerflex'>
      <div className='auth_wrapper centerflex'>
        <h5 className='second_text'>Chào mừng bạn đến tới Yolo!</h5>
        <Title level={2} style={{ margin: '20px 0 50px 0' }}>Đăng Ký</Title>
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Họ tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="Mật khẩu"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder="phone"
            />
          </Form.Item>
        </Form>
        <div className='centerflex' style={{ flexDirection: 'column' }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </div>
        <Divider plain>Hoặc đăng nhập bằng</Divider>
        <Button type='link' style={{ marginBottom: 'auto' }}>
          <Image src='https://bizweb.dktcdn.net/100/438/408/themes/897269/assets/ic_btn_google.svg?1678162315584' preview={false} style={{ border: '1px solid var(--border-color)', borderRadius: 30 }} />
        </Button>

        <div className='sign-up-wrapper'>
          <span className='sign-up-wrapper-txt'>Bạn đã có tài khoản?</span>
          <Link className='sign-up-wrapper-link' to={'/signup'}>  Đăng nhập ngay!</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
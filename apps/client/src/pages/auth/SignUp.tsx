import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider, Image, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createAccount } from '../../api/accountAPI'
import ErrorAlert from '../../components/Alert/ErrorAlert'
import { EMAIL_FORMAT_RULE, PHONENUMBER_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'


const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { email, password, ...userData } = values;
      const data = await createAccount(email, password, userData);
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Spin spinning={loading}>
      <div className='svgBg centerflex'>
        <div className='auth_wrapper centerflex'>
          <h5 className='second_text'>Chào mừng bạn đến tới Yolo!</h5>
          <Title level={2} style={{ margin: '20px 0 50px 0' }}>Đăng Ký</Title>
          <Form
            form={form}
            name="signup"
            className="signup-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Space>
              <Form.Item
                name="firstname"
                rules={[REQUIRED_RULE]}
              >
                <Input prefix={<UserOutlined />} placeholder="Họ " />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[REQUIRED_RULE]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên" />
              </Form.Item>
            </Space>
            <Form.Item
              name="phone_number"
              rules={[REQUIRED_RULE, PHONENUMBER_FORMAT_RULE]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Số điện thoại"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[REQUIRED_RULE, EMAIL_FORMAT_RULE]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[REQUIRED_RULE]}
            >
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[REQUIRED_RULE]}
            >
              <Input
                placeholder="Địa chỉ"
              />
            </Form.Item>
            <div className='centerflex' style={{ flexDirection: 'column' }}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </div>
          </Form>
          <Divider plain>Hoặc đăng nhập bằng</Divider>
          <Button type='link' style={{ marginBottom: 'auto' }}>
            <Image src='https://bizweb.dktcdn.net/100/438/408/themes/897269/assets/ic_btn_google.svg?1678162315584' preview={false} style={{ border: '1px solid var(--border-color)', borderRadius: 30 }} />
          </Button>

          <div className='sign-up-wrapper'>
            <span className='sign-up-wrapper-txt'>Bạn đã có tài khoản?</span>
            <Link className='sign-up-wrapper-link' to={'/login'}>  Đăng nhập ngay!</Link>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default SignUp
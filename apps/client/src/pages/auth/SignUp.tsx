import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Divider, Image, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createAccount } from '../../api/accountAPI'
import ErrorAlert from '../../components/Alert/ErrorAlert'
import SuccessAlert from '../../components/Alert/SuccessAlert'
import { EMAIL_FORMAT_RULE, PHONENUMBER_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'
import { AppContext } from '../../context/AppContext'
import LocalStorage from '../../helper/localStorage'


const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { email, password, ...userData } = values;
      console.log("🚀 ~ file: SignUp.tsx:23 ~ onFinish ~ { email, password, ...userData }:", { email, password, ...userData })
      console.log("🚀 ~ file: SignUp.tsx:23 ~ onFinish ~ values:", values)
      const data = await createAccount(email, password, userData);
      SuccessAlert('Tạo tài khoản thành công hãy đăng nhập!');
      nav('/login')
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
                name="lastname"
                rules={[REQUIRED_RULE]}
              >
                <Input prefix={<UserOutlined />} placeholder="Họ " />
              </Form.Item>
              <Form.Item
                name="firstname"
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
              tooltip={'Lưu ý: email có phân biệt kí tự hoa và thường'}
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
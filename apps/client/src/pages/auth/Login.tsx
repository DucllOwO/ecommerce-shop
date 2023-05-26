import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Image, Input, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/authAPI'
import { REQUIRED_RULE } from '../../constant/formRules'
import { AppContext } from '../../context/AppContext'
import LocalStorage from '../../helper/localStorage'

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();
  const appCtx = useContext(AppContext);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = await login(values.email, values.password);
      LocalStorage.setItem('access_token', data.data.access_token)
      LocalStorage.setItem('user', data.data.user)
      appCtx?.setUser(data.data.user)
      if (data.data.user.is_admin) {
        nav('/admin/dashboard');
      } else
        nav('/')

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Spin spinning={loading}>
      <div className='svgBg centerflex'
      >
        <div className='auth_wrapper centerflex'>

          <Title level={2} style={{ marginBottom: 50 }}>Đăng nhập</Title>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[REQUIRED_RULE]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[REQUIRED_RULE]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <div className='centerflex' style={{ flexDirection: 'column' }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>

              <a className='forgot-password-txt'>Quên mật khẩu</a>
            </div>
          </Form>
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
    </Spin>
  )
}

export default Login



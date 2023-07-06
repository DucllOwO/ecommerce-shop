import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Image, Input, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/authAPI'
import { REQUIRED_RULE } from '../../constant/formRules'
import { AppContext } from '../../context/AppContext'
import LocalStorage from '../../helper/localStorage'
import { getCart, updateUser } from '../../api/CustomerAPI'
import dayjs from 'dayjs'
import ErrorAlert from '../../components/Alert/ErrorAlert'

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
      const updateData = await updateUser({ logged_date: dayjs(Date.now()) }, data.data.user.id);
      getCart(data.data.user.id).then((res) => {
        LocalStorage.setItem('cart', res.data);
      });
      appCtx?.setUser(data.data.user)
      if (data.data.user.is_admin) {
        nav('/admin/dashboard');
      } else
        nav('/')

    } catch (error) {
      ErrorAlert('Tài khoản không tồn tại hoặc thông tin chưa chính xác. Xin hãy kiểm tra lại.')
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

              <Link to={'/forgot-password'} className='forgot-password-txt'>Quên mật khẩu</Link>
            </div>
          </Form>

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



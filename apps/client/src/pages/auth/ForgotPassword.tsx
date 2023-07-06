import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { Rule } from 'antd/es/form'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAccount, resetPassword } from '../../api/accountAPI'
import { login, sendEmailResetPassword } from '../../api/authAPI'
import { updateUser } from '../../api/CustomerAPI'
import ErrorAlert from '../../components/Alert/ErrorAlert'
import { EMAIL_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCodeInput, setVerifyCodeInput] = useState('');
  const [email, setEmail] = useState('')

  const onFinish = async (values: any) => {
    setLoading(true);
    setEmail(values.email);
    sendEmailResetPassword(values.email).then((res) => {
      setIsEmailSent(true);
      setVerifyCode(res.data)
      console.log("🚀 ~ file: ForgotPassword.tsx:22 ~ sendEmailResetPassword ~ res.data:", res.data)
    }).finally(() => setLoading(false))
  }

  const handleCheckVerifyCode = () => {
    setLoading(true);
    if (verifyCode == verifyCodeInput) {
      resetPassword(email).then(() => {
        nav('/reset-password-success');
      }).catch((err) => {
        ErrorAlert(err.message);
      }).finally(() => setLoading(false))
    }
    setLoading(false);
  }

  const validateAsync = async (rule: Rule, value: any) => {
    // Perform your async validation logic here

    // For example, make an API call to validate the input
    // Return a Promise that resolves to undefined for valid input
    // Return a Promise that rejects with an error message for invalid input
  };

  return (
    <Spin spinning={loading}>
      <div className='svgBg centerflex'
      >
        <div className='auth_wrapper centerflex'>
          {isEmailSent ? <>
            <Title level={2} style={{ marginBottom: 10, width: "90%", textAlign: 'center' }}>Nhập mã xác nhận</Title>
            <Typography.Text type='secondary' style={{ marginBottom: 50, width: "70%", textAlign: 'center' }}>Mã xác nhận đã được gửi về email của bạn. Hãy kiểm tra email bạn vừa nhập.</Typography.Text>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nhập xã xác nhận" value={verifyCodeInput} onChange={(e) => setVerifyCodeInput(e.target.value)} style={{ width: "50%", marginBottom: 15 }} />
            <div className='centerflex' style={{ flexDirection: 'column' }}>
              <Button type="primary" onClick={handleCheckVerifyCode}>
                Xác nhận
              </Button>
            </div>

            <div className='sign-up-wrapper'>
              <span className='sign-up-wrapper-txt'>Đã nhớ ra mật khẩu?</span>
              <Link className='sign-up-wrapper-link' to={'/login'}>  Đăng nhập ngay!</Link>
            </div> </> : <>
            <Title level={2} style={{ marginBottom: 10 }}>Quên mật khẩu</Title>
            <Typography.Text type='secondary' style={{ marginBottom: 50 }}>Đường link xác nhận sẽ được gửi về email của bạn</Typography.Text>
            <Form
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[REQUIRED_RULE, EMAIL_FORMAT_RULE, ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (value.length > 0 && isEmail(value)) {
                      // check every except current room
                      const res = await getAccount(value);
                      return res.data.email
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error(
                            "Email không tồn tại, hãy thử lại."
                          )
                        );
                    }
                  },
                }),]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>

              <div className='centerflex' style={{ flexDirection: 'column' }}>
                <Button type="primary" htmlType="submit">
                  Gửi mail đặt lại mật khẩu
                </Button>
              </div>
            </Form>

            <div className='sign-up-wrapper'>
              <span className='sign-up-wrapper-txt'>Đã nhớ ra mật khẩu?</span>
              <Link className='sign-up-wrapper-link' to={'/login'}>  Đăng nhập ngay!</Link>
            </div></>}

        </div>
      </div>
    </Spin>
  )
}

function isEmail(input: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

export default ForgotPassword



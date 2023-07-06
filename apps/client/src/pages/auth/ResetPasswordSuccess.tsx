import { Button, Card, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const ResetPasswordSuccess = () => {
  return (
    <div className='svgBg centerflex'
    >
      <Card style={{ width: "40%" }}>
        <Result
          status="success"
          title="Cập nhật mật khẩu thành công."
          subTitle="Mật khẩu đã được cập nhật thành số điện thoại của bạn, hãy vào trang thông tin các nhân để đổi lại mật khẩu."
          extra={[
            <Link to='/login'>
              <Button type="primary" key="console">
                Đăng nhập ngay
              </Button>
            </Link>
          ]}
        />
      </Card>
    </div>
  )
}

export default ResetPasswordSuccess
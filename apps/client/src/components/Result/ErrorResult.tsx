import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorResult = () => {
  const nav = useNavigate();
  return (
    <Result
      title="Lỗi!!"
      subTitle="Đã xảy ra lỗi, xin hãy thử lại."
      extra={<Button type="primary" onClick={() => nav('/')}>Back Home</Button>}
    />
  )
}

export default ErrorResult
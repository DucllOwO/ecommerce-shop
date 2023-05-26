import { Button, Result } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ErrorResult = () => {
  return (
    <Result
      status="500"
      title="Lỗi!!"
      subTitle="Đã xảy ra lỗi, xin hãy thử lại."
    />
  )
}

export default ErrorResult
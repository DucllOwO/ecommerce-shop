import { Button, Card, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className='centerflex svgBg'>

      <Card bordered style={{ width: '40%', height: '80%' }}>
        <Result
          status="404"
          title="404"
          subTitle="Trang này không tồn hãy. Hãy quay lại trang chủ"
          extra={<Button onClick={() => nav('')} type="primary">Trở về trang chủ</Button>}
        />
      </Card>
    </div>
  )
}

export default NotFound
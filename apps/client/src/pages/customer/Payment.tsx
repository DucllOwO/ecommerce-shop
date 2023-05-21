import { Button, Card, Col, Result, Row, Typography } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import OrderDetailCard from './components/OrderDetailCard'

const Payment = () => {
  return (
    <div className='centerflex' style={{ flexDirection: 'column', rowGap: 50, padding: '20px 0' }}>
      <Row>
        <Col span={12}>
          <Card bordered>
            <Result
              status="success"
              title="Mua hàng thành công"
              subTitle="Nếu bạn chọn phương thức thanh toán qua momo hoặc tài khoản ngân hàng vui vòng chuyển khoản về số tài khoản sau đúng số tiền 190000000"
              extra={[
                <Button type="primary" key="console">
                  Về trang chủ
                </Button>,
                <Button key="buy">Xem chi tiết</Button>,
              ]}
            />
          </Card>
        </Col>
        <Col offset={2} span={10}>
          <Card title={'Thông tin chuyển khoản'} bordered>
            <Title level={4}>Momo</Title>
            <p>Số điện thoại: 09441242222</p>
            <p>Chủ tài khoản: Nguyễn Trí Duck</p>
            <p>Nội dung: {'Mã order'}</p>
            <p>Số tiền: 1900000000</p>
            <Title level={4}>Tài khoản ngân hàng</Title>
            <p>Số tài khoản: 09441242222</p>
            <p>Ngân hàng Sacombank</p>
            <p>Chủ tài khoản: Nguyễn Trí Duck</p>
            <p>Nội dung: {'Mã order'}</p>
            <p>Số tiền: 1900000000</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Payment
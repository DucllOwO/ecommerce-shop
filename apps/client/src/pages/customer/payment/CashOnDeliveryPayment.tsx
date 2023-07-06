import { Button, Card, Col, Image, List, Result, Row, Space, Typography } from 'antd'
import { useContext, useEffect } from 'react';
import { CheckoutContext } from '../../../context/CheckoutContext'
import { formatNumberWithComma } from '../../../helper/utils';
import { useNavigate } from 'react-router-dom';

const CashOnDeliveryPayment = () => {
  const checkout = useContext(CheckoutContext);
  const nav = useNavigate();
  return (
    <div className='centerflex' style={{ flexDirection: 'column', rowGap: 50, padding: '20px 0' }}>
      <Row style={{ width: '80%' }}>
        <Col span={10}>
          <Card bordered >
            <Result
              status="success"
              title="Đặt hàng thành công"
              subTitle={<Space direction='vertical'>
                <p>Thông tin đơn hàng:</p>
                <p>Họ tên: {checkout?.order?.firstname + " " + checkout?.order?.lastname}</p>
                <p>Số điện thoại: {checkout?.order?.phone_number}</p>
                <p>Địa chỉ: {checkout?.order?.address}</p>
                <p>Cảm ơn bạn đã mua hàng.</p>
                <p>Nếu có bất kì vấn đề gì cần hỗ trợ, hãy liên lạc với của hàng qua số điện thoại 0912324274</p>
              </Space>}
              extra={[
                <Button type="primary" key="console" onClick={() => nav("/")}>
                  Về trang chủ
                </Button>
              ]}
            />
          </Card>
        </Col>
        <Col offset={2} span={12}>
          <Card bordered style={{ width: '100%' }} title={'Chi tiết đơn hàng'} >
            <List
              itemLayout="horizontal"
              dataSource={
                checkout?.order?.Order_detail
              }
              renderItem={(item, index) => (
                <List.Item key={item.product_item.id}>
                  <List.Item.Meta
                    avatar={<Image width={80} height={110} src={item.product_item.product.image[0]} alt='slug' style={{ borderRadius: 5 }} />}
                    title={item.product_item.product.name}
                    description={`x ${item.quantity}`}
                  />
                  <div>{formatNumberWithComma(item.product_item.product.price * item.quantity)}</div>
                </List.Item>
              )}
              pagination={{
                pageSize: 3,
              }}
              footer={null}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CashOnDeliveryPayment
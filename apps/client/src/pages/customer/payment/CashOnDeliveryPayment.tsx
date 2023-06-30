import { Button, Card, Col, Image, List, Result, Row, Space, Typography } from 'antd'
import { useContext, useEffect } from 'react';
import { CheckoutContext } from '../../../context/CheckoutContext'

const CashOnDeliveryPayment = () => {
  const checkout = useContext(CheckoutContext);
  useEffect(() => {
    console.log(checkout?.order);
    console.log(checkout?.receipt);
  }, [])

  return (
    <div className='centerflex' style={{ flexDirection: 'column', rowGap: 50, padding: '20px 0' }}>
      <Row style={{ width: '80%' }}>
        <Col span={12}>
          <Card bordered >
            <Result
              status="success"
              title="Đặt hàng thành công"
              subTitle={<Space direction='vertical'>
                <p>Cảm ơn bạn đã mua hàng.</p>
                <p>Nếu có bất kì vấn đề gì cần hỗ trợ, hãy liên lạc với của hàng qua số điện thoại 0912324274</p>
              </Space>}
              extra={[
                <Button type="primary" key="console">
                  Về trang chủ
                </Button>
              ]}
            />
          </Card>
        </Col>
        <Col offset={2} span={10}>
          <Card bordered style={{ width: '100%' }} title={'Chi tiết đơn hàng'} >
            <List
              itemLayout="horizontal"
              dataSource={
                checkout?.order?.Order_detail
              }
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image width={80} height={110} src='https://img.vietqr.io/image/970415-113366668888-print.png' alt='slug' style={{ borderRadius: 5 }} />}
                    title={'quan ao 1'}
                    description="x1"
                  />
                  <div>Gia cua tung mon</div>
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
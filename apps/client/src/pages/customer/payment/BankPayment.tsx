import { Button, Card, Col, Image, List, Result, Row, Space, Typography } from 'antd'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderByID } from '../../../api/orderAPI';
import { CheckoutContext, CheckoutProvider } from '../../../context/CheckoutContext';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const BankPayment = () => {
  const nav = useNavigate();
  const checkOut = useContext(CheckoutContext);

  return (
    <div className='centerflex' style={{ flexDirection: 'column', rowGap: 50, padding: '20px 0' }}>
      <Row>
        <Col span={12}>
          <Row >
            <Card bordered>
              <Result
                status="success"
                title="Đặt hàng thành công"
                subTitle={<Space direction='vertical'>
                  <p>Cảm ơn bạn đã mua hàng.</p>
                  <p>Vui lòng quét mã để chuyển khoản vào tài khoản ngân hàng để hoàn thành thanh toán đơn hàng.</p>
                </Space>}
                extra={[
                  <Button type="primary" key="console" onClick={() => nav('/')}>
                    Về trang chủ
                  </Button>
                ]}
              />
            </Card>
          </Row>
          <Row style={{ width: '100%', marginTop: 10 }}>
            <Card bordered style={{ width: '100%' }} title={'Chi tiết đơn hàng'} >
              <List
                itemLayout="horizontal"
                dataSource={data}
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
          </Row>
        </Col>
        <Col offset={2} span={10}>
          <Image src='https://img.vietqr.io/image/970415-113366668888-print.png' alt='bank-info' preview={false} style={{ borderRadius: 5, boxShadow: '-3px 3px 3px -1px rgba(0,0,0,0.3)' }} />
        </Col>
      </Row>
    </div>
  )
}

export default BankPayment
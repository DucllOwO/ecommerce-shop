import { Row, Col, Card, Avatar, Image } from 'antd'
import React from 'react'
import NumberCard from '../../components/Card/NumberCard'
import OrderIcon from '../../assets/icon/bill_96px.png'
import CustomerIcon from '../../assets/icon/customer_96px.png'
import FavoriteIcon from '../../assets/icon/heart_96px.png'
import ShirtIcon from '../../assets/icon/t-shirt_96px.png'
import LineChart from '../../components/Chart/LineChart'
import UserIcon from '../../assets/icon/user_96px.png'
import pic1 from '../../assets/images/products/product-01 (1).jpg'

const { Meta } = Card;

const Dashboard = () => {
  return (
    <div>
      <Row gutter={24} style={{ marginBottom: 20 }}>
        <Col lg={6} md={12}>
          <NumberCard title='Đơn hàng' icon={OrderIcon} description={'100,100,100,100'} />
        </Col>
        <Col lg={6} md={12}>
          <NumberCard title='Khách hàng mới' icon={CustomerIcon} description={'100,100'} />
        </Col>
        <Col lg={6} md={12}>
          <NumberCard title='Đánh giá tốt' icon={FavoriteIcon} description={'100,100'} />
        </Col>
        <Col lg={6} md={12}>
          <NumberCard title='Sản phẩm bán được' icon={ShirtIcon} description={'100,100'} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card>
            <LineChart />
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image src={pic1} />}
          >
            <Meta title="Bán chạy nhất" description="Aó màu cam" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image src={pic1} />}
          >
            <Meta title="Xem nhiều nhất" description="Aó màu cam" />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered title={"Đánh giá của khách hàng"} style={{ height: '100%' }}>
            <Meta avatar={<Avatar src={UserIcon} />}
              title={'Khách A'}
              description={'Mlem mlem'} />
            <Meta avatar={<Avatar src={UserIcon} />}
              title={'Khách A'}
              description={'Mlem mlem'} />
            <Meta avatar={<Avatar src={UserIcon} />}
              title={'Khách A'}
              description={'Mlem mlem'} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
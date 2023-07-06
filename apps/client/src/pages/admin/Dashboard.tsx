import { Row, Col, Card, Avatar, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import NumberCard from '../../components/Card/NumberCard'
import OrderIcon from '../../assets/icon/bill_96px.png'
import CustomerIcon from '../../assets/icon/customer_96px.png'
import FavoriteIcon from '../../assets/icon/heart_96px.png'
import ShirtIcon from '../../assets/icon/t-shirt_96px.png'
import LineChart from '../../components/Chart/LineChart'
import UserIcon from '../../assets/icon/user_96px.png'
import pic1 from '../../assets/images/products/product-01 (1).jpg'
import FeedbackList from '../../components/List/FeedbackList'
import IProduct from '../../interface/Product'
import { fetchTopTenBestSellers } from '../../api/admin/dashboardAPI'
import { fetchTopTenMostViewed } from '../../api/productAPI'

const { Meta } = Card;

const Dashboard = () => {
  const [bestSaler, setBestSaler] = useState<IProduct>();
  const [mostViewed, setMostViewed] = useState<IProduct>();

  useEffect(() => {
    fetchTopTenBestSellers().then((data) => {
      setBestSaler(data.data[0])
    })
    fetchTopTenMostViewed().then((data) => {
      setMostViewed(data.data[0])
    })
  }, [])

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
            cover={<Image src={bestSaler?.image[0]} />}
          >
            <Meta title="Bán chạy nhất" description={bestSaler?.name} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image src={mostViewed?.image[0]} />}
          >
            <Meta title="Xem nhiều nhất" description={mostViewed?.name} />
          </Card>
        </Col>
        <Col span={12}>
          <FeedbackList pageSize={2} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
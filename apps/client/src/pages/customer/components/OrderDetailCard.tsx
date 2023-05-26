import { LeftOutlined } from '@ant-design/icons'
import { Card, Descriptions, Space, Button, Tag, Divider } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductOrderDetailTable from '../../../components/Table/Product/ProductDetailTable.Order'

const OrderDetailCard = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Descriptions title={<Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Thông tin đơn hàng { }</Title>
        {/* <Button type='primary' icon={<LeftOutlined />} size='large' onClick={() => navigate('/orders')} /> */}
      </Space>} bordered>
        <Descriptions.Item label="ID" span={1}>1</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>Nguyễn Trí Đức</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>Số 18 đường Hai Bà Trưng phường 2 thị xã Kiến Tường tỉnh Long An</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          0944124232
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          <Tag color={'green'} title={'Hoàn thành'} />
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú" span={3}>
        </Descriptions.Item>
        <Descriptions.Item label="Giảm giá" span={3}>$20.00</Descriptions.Item>
        <Descriptions.Item label="Tổng giá" span={3}>$60.00</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable />
    </Card>
  )
}

export default OrderDetailCard
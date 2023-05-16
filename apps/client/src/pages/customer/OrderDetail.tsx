import { LeftOutlined } from '@ant-design/icons'
import { Button, Card, Descriptions, Divider, Space, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import ProductOrderDetailTable from '../../components/Table/Product/ProductDetailTable.Order'
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Space className='svgBg' style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction='vertical' style={{ width: '70vw', margin: '20px 0px' }}>
        <Card>
          <Descriptions title={<Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Title level={3}>Thông tin đơn hàng {id}</Title>
            <Button type='primary' icon={<LeftOutlined />} size='large' onClick={() => navigate('/orders')} />
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
      </Space>
    </Space>
  )
}

export default OrderDetail
import { LeftOutlined } from '@ant-design/icons'
import { Card, Descriptions, Space, Button, Tag, Divider } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductOrderDetailTable from '../../../components/Table/Product/ProductDetailTable.Order'
import IOrder from '../../../interface/Order'
import dayjs from 'dayjs'

type OrderDetailProps = {
  data?: IOrder
}

const OrderDetailCard = ({data}: OrderDetailProps) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Descriptions title={<Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Thông tin đơn hàng { }</Title>
        {/* <Button type='primary' icon={<LeftOutlined />} size='large' onClick={() => navigate('/orders')} /> */}
      </Space>} bordered>
        <Descriptions.Item label="ID" span={1}>{data?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${data?.firstname} ${data?.lastname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">{dayjs(data?.date).format('HH:mm:ss DD/MM/YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {data?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          <Tag color={'green'} title={'Hoàn thành'} >{data?.status ==='1' ? "Hoàn thành" : "Chưa hoàn thành"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú" span={3}>
        </Descriptions.Item>
        {/* <Descriptions.Item label="Giảm giá" span={3}>$20.00</Descriptions.Item> */}
        <Descriptions.Item label="Tổng giá" span={3}>{data?.total_cost}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable data={data?.Order_detail}/>
    </Card>
  )
}

export default OrderDetailCard
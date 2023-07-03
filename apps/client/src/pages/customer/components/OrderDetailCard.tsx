import { LeftOutlined } from '@ant-design/icons'
import { Card, Descriptions, Space, Button, Tag, Divider } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductOrderDetailTable from '../../../components/Table/Product/ProductDetailTable.Order'
import IOrder from '../../../interface/Order'
import dayjs from 'dayjs'
import { formatNumberWithComma, formatToFullDate } from '../../../helper/utils'

type OrderDetailProps = {
  data?: IOrder
}

const OrderDetailCard = ({ data }: OrderDetailProps) => {
  const navigate = useNavigate();

  function renderTag(status?: string) {
    switch (status) {
      case '0':
        return <Tag color={'yellow'}>Đang chờ xác nhận</Tag>
      case '1':
        return <Tag color={'blue'}>Đang giao hàng</Tag>
      case '2':
        return <Tag color={'green'}>Hoàn thành</Tag>
      case '3':
        return <Tag>Bị hủy</Tag>
      default:
        return <Tag color={'red'}>Đơn hàng bị lỗi</Tag>;
    }
  }
  return (
    <Card>
      <Descriptions title={<Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Thông tin đơn hàng {data?.id}</Title>
        <Button type='primary' icon={<LeftOutlined />} size='large' onClick={() => navigate('/orders')} />
      </Space>} bordered>
        <Descriptions.Item label="ID" span={1}>{data?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${data?.firstname} ${data?.lastname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">{formatToFullDate(data?.date)}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {data?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          {renderTag(data?.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú" span={3}>
        </Descriptions.Item>
        {/* <Descriptions.Item label="Giảm giá" span={3}>$20.00</Descriptions.Item> */}
        <Descriptions.Item label="Tổng giá" span={3}>{formatNumberWithComma(data?.total_cost)}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable data={data?.Order_detail} />
    </Card>
  )
}

export default OrderDetailCard
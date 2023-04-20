import { Tag, Descriptions, Modal, Divider } from 'antd'
import React from 'react'
import ProductItemTable from '../Table/Product/ProductItemTable'

const OrderModal = () => {
  return (
    <Modal title={'Thông tin đơn hàng'} open={true} width={'70vw'}>
      <Descriptions title="Thông tin người dùng" bordered>
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
      <ProductItemTable />
    </Modal>
  )
}

export default OrderModal
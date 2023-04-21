import { Tag, Descriptions, Modal, Divider } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'

interface OrderModalProps extends ModalProps {

}

const OrderModal = ({ isOpen, setIsModalOpen }: OrderModalProps) => {
  return (
    <Modal title={'Thông tin đơn hàng'} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
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
      <ProductOrderDetailTable />
    </Modal>
  )
}

export default OrderModal
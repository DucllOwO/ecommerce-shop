import { Tag, Descriptions, Modal, Divider } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'
import IOrder from '../../interface/Order'
import { formatNumberWithComma, formatToFullDate } from '../../helper/utils'

interface OrderModalProps extends ModalProps {
  selectedOrder?: IOrder
}

const OrderModal = ({ isOpen, setIsModalOpen, selectedOrder }: OrderModalProps) => {
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
    <Modal title={'Thông tin đơn hàng'} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Descriptions title="Thông tin người dùng" bordered>
        <Descriptions.Item label="ID" span={1}>{selectedOrder?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${selectedOrder?.firstname} ${selectedOrder?.lastname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{selectedOrder?.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">{formatToFullDate(selectedOrder?.date)}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {selectedOrder?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          {renderTag(selectedOrder?.status)}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Giảm giá" span={3}>{selectedOrder.}</Descriptions.Item> */}
        <Descriptions.Item label="Tổng giá (đ)" span={3}>{formatNumberWithComma(selectedOrder?.total_cost)}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable data={selectedOrder?.Order_detail} />
    </Modal>
  )
}

export default OrderModal
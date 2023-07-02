import { Tag, Descriptions, Modal, Divider } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'
import IOrder from '../../interface/Order'

interface OrderModalProps extends ModalProps {
  selectedOrder?: IOrder
}

const OrderModal = ({ isOpen, setIsModalOpen, selectedOrder }: OrderModalProps) => {
  return (
    <Modal title={'Thông tin đơn hàng'} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Descriptions title="Thông tin người dùng" bordered>
        <Descriptions.Item label="ID" span={1}>{selectedOrder?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${selectedOrder?.lastname} ${selectedOrder?.firstname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{selectedOrder?.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">{selectedOrder?.date}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {selectedOrder?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          <Tag color={'green'} title={'Hoàn thành'}>{selectedOrder?.status === "0" ? "Đang đợi" : selectedOrder?.status === "1" ? "Đang vận chuyển" : selectedOrder?.status === "2" ? "Hoàn thành" : "Đã huỷ"}</Tag>
        </Descriptions.Item>
        {/* <Descriptions.Item label="Ghi chú" span={3}>
        </Descriptions.Item> */}
        <Descriptions.Item label="Giảm giá" span={3}>$20.00</Descriptions.Item>
        <Descriptions.Item label="Tổng giá" span={3}>{selectedOrder?.total_cost}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable data={selectedOrder?.Order_detail}/>
    </Modal>
  )
}

export default OrderModal
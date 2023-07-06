import { Tag, Descriptions, Modal, Divider } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'
import IOrder from '../../interface/Order'
import IReceipt from '../../interface/Receipt'
import dayjs from 'dayjs'
import { formatNumberWithComma } from '../../helper/utils'

interface ReceiptModalProps extends ModalProps {
  selectedReceipt?: IReceipt
}

const ReceiptModal = ({ isOpen, setIsModalOpen, selectedReceipt }: ReceiptModalProps) => {
  return (
    <Modal title={'Thông tin đơn hàng'} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Descriptions title="Thông tin người dùng" bordered>
        <Descriptions.Item label="ID" span={1}>{selectedReceipt?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${selectedReceipt?.order.lastname} ${selectedReceipt?.order.firstname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{selectedReceipt?.order.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">{dayjs(selectedReceipt?.date).format("HH:mm:ss DD/MM/YYYY")}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {selectedReceipt?.order.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          <Tag color={'green'} title={'Hoàn thành'}>{selectedReceipt?.status === '0' ? "Chưa thanh toán" : "Đã thanh toán"}</Tag>
        </Descriptions.Item>
        {/* <Descriptions.Item label="Ghi chú" span={3}>
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Giảm giá" span={3}>$20.00</Descriptions.Item> */}
        <Descriptions.Item label="Tổng giá" span={3}>{formatNumberWithComma(selectedReceipt?.cost)}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <ProductOrderDetailTable data={selectedReceipt?.order.Order_detail}/>
    </Modal>
  )
}

export default ReceiptModal
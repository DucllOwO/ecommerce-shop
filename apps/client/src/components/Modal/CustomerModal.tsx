import { Tag, Descriptions, Modal, Image as AntdImage, Select, Form, InputNumber, Switch, Upload, UploadFile, UploadProps, Input, Button, Divider } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import { FC, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import CustomerTab from '../Tab/CustomerTab'
import ProductOrderDetailTable from '../Table/Product/ProductDetailTable.Order'
import { IUser } from '../../interface/User'
import dayjs from 'dayjs'

interface ProductModalProps extends ModalProps {
  data?: IUser
}


const CustomerModal: FC<ProductModalProps> = ({ isOpen, setIsModalOpen, data }) => {


  return (
    <Modal
      title={'Thông tin chi tiết khách hàng'}
      open={isOpen} width={'70vw'}
      onCancel={() => {
        setIsModalOpen((prev: boolean) => !prev)
      }}
      footer={null}>
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={1}>{data?.id}</Descriptions.Item>
        <Descriptions.Item label="Họ tên" span={2}>{`${data?.lastname} ${data?.firstname}`}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>{data?.address}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {data?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Lần đăng nhập gần nhất" span={3}>
        {(dayjs(Date.now()).diff(dayjs(data?.logged_date), 'hour') <= 24) ? `${(dayjs(Date.now()).diff(dayjs(data?.logged_date), 'hour'))} giờ trước` : `${(dayjs(Date.now()).diff(dayjs(data?.logged_date), 'days'))} ngày trước`}
        </Descriptions.Item>
        <Descriptions.Item label="Lượt xem sản phẩm" span={2}>10000</Descriptions.Item>
        <Descriptions.Item label="Số đơn hàng" span={2}>
          999999
        </Descriptions.Item>
        <Descriptions.Item label="Tổng chi tiêu (đ)" span={3}>60000000</Descriptions.Item>
      </Descriptions>
      <Divider />
      <CustomerTab />
    </Modal>
  )
}



export default CustomerModal
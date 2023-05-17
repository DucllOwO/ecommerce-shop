import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { FC } from 'react'
import { DATE_GREATER_THAN_CURRENT_DATE_RULE, REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'



const VoucherCreateModal: FC<ModalProps> = ({ isOpen, setIsModalOpen }) => {
  const [createForm] = Form.useForm();

  return (
    <Modal title={'Tạo khuyến mãi: '} open={isOpen} width={'40vw'} footer={[
      <Button key="back" onClick={() => {
        setIsModalOpen(false)
      }}>
        Hủy bỏ
      </Button>,
      <Button key="submit" type="primary" onClick={() => {
        setIsModalOpen(false)
      }}>
        Lưu
      </Button>
    ]} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <Form form={createForm} layout='vertical'>
        <Form.Item name={'name'} label={'Tên khuyến mãi'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá (%)'} rules={[REQUIRED_RULE]}>
          <InputNumber controls={false} />
        </Form.Item>
        <Form.Item name={'date'} label={'Ngày hết hạn'} rules={[REQUIRED_RULE, DATE_GREATER_THAN_CURRENT_DATE_RULE]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name={'discount'} label={'Mô tả'} rules={[REQUIRED_RULE]}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default VoucherCreateModal
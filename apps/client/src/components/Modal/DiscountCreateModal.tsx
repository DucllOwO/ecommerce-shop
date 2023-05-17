import { Button, Form, FormInstance, Input, InputNumber, Modal, Select } from 'antd'
import React, { FC } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'



const DiscountCreateModal: FC<ModalProps> = ({ isOpen, setIsModalOpen }) => {
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
      </Form>
    </Modal>
  )
}

export default DiscountCreateModal
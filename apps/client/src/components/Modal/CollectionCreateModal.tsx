import { Button, Form, FormInstance, Input, Modal, Select } from 'antd'
import React, { FC } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { ModalProps } from '../../interface/ModalProps'


const CollectionCreateModal: FC<ModalProps> = ({ isOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  return (
    <Modal title={'Tạo bộ siêu tập: '} open={isOpen} width={'40vw'} footer={[
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
      <Form form={form} layout='vertical'>
        <Form.Item name={'name'} label={'Name'} rules={[REQUIRED_RULE]}>
          <Input />
        </Form.Item>
        <Form.Item name={'discount'} label={'Giảm giá'} rules={[REQUIRED_RULE]}>
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CollectionCreateModal
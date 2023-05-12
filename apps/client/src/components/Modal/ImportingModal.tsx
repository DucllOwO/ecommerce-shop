import { AutoComplete, Form, Input, Modal, Select } from 'antd'
import React, { FC } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductInventoryForm from '../Form/ProductInventoryForm'

interface ImportingModalProps extends ModalProps {
  isReadOnly?: boolean
}

const ImportingModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, isReadOnly = false }) => {
  return (
    <Modal
      title={'Nhập sản phẩm'}
      open={isOpen} width={'70vw'}
      onCancel={() => {
        isReadOnly && Modal.confirm({
          title: 'Cảnh báo mất dữ liệu',
          content: 'Thoát sẽ bị mất hết thông tin nhập hàng, bạn có đồng ý?',
          okText: 'Đồng ý',
          cancelText: 'Quay lại',
          onOk: () => {
            setIsModalOpen((prev: boolean) => !prev)
          }
        })
      }}>
      <Form
        autoComplete="off">
        <Form.Item name="product" label="Nhập sản phẩm" rules={[{ required: true, message: 'Missing area' }]}>
          <AutoComplete
            style={{ width: 300 }}
            disabled={isReadOnly}
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete>
        </Form.Item>
        <ProductInventoryForm />
      </Form>
    </Modal>
  )
}

export default ImportingModal
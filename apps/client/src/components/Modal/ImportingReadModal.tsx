import { AutoComplete, Form, Input, Modal, Select } from 'antd'
import React, { FC } from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductInventoryTable from '../Table/Product/ProductInventoryTable'
import IProduct_item from '../../interface/ProductItem'

interface ImportingModalProps extends ModalProps {
  data?: IProduct_item[]
}

const ImportingReadModal: FC<ImportingModalProps> = ({ isOpen, setIsModalOpen, data }) => {
  return (
    <Modal
      title={'Số lượng tồn kho'}
      open={isOpen} width={'70vw'}
      onCancel={() => {
        setIsModalOpen((prev: boolean) => !prev)
      }}>
      <ProductInventoryTable data={data} />
    </Modal>
  )
}

export default ImportingReadModal
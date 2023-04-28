import { Modal } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductTagDetailTable from '../Table/Product/ProductDetailTable.Tag'

interface TagModalProps extends ModalProps {

}
const TagModal = ({ isOpen, setIsModalOpen }: TagModalProps) => {
  return (
    <Modal title={'Danh sách sản phẩm có gắn tag: '} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <ProductTagDetailTable />
    </Modal>
  )
}

export default TagModal
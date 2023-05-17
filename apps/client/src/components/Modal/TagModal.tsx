import { Modal } from 'antd'
import React from 'react'
import { ModalProps } from '../../interface/ModalProps'
import ProductTagDetailTable from '../Table/Product/ProductDetailTable.Tag'
import ITag from '../../interface/Tag'

interface TagModalProps extends ModalProps {
  selectedTag?: ITag
}
const TagModal = ({ isOpen, setIsModalOpen, selectedTag }: TagModalProps) => {
  return (
    <Modal title={'Danh sách sản phẩm có gắn tag: '} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <ProductTagDetailTable selectedTag={selectedTag} />
    </Modal>
  )
}

export default TagModal
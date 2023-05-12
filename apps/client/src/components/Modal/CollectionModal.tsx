import { Modal } from 'antd';
import React from 'react'
import { ModalProps } from '../../interface/ModalProps';
import ProductCollectionDetailTable from '../Table/Product/ProductDetailTable.Collection';

interface CollectionModalProps extends ModalProps {

}

const CollectionModal = ({ isOpen, setIsModalOpen }: CollectionModalProps) => {
  return (
    <Modal title={'Sản phẩm thuộc bộ siêu tập: '} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <ProductCollectionDetailTable />
    </Modal>
  )
}

export default CollectionModal
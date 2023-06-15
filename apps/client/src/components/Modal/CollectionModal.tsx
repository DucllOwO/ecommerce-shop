import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { ModalProps } from '../../interface/ModalProps';
import ProductCollectionDetailTable from '../Table/Product/ProductDetailTable.Collection';
import { ICollection } from '../../interface/Collection';
import { IProduct } from '../../interface/Product';
import { fetchCollection } from '../../api/admin/productAPI';

interface CollectionModalProps extends ModalProps {
  selectedItem?: ICollection
}

const CollectionModal = ({ isOpen, setIsModalOpen, selectedItem }: CollectionModalProps) => {

  const [data, setData] = useState<IProduct[]>();

  useEffect(()=>{
    if(selectedItem)
      fetchCollection(selectedItem?.id).then((data) => {
        setData(data.data.Product);
      })
  },[selectedItem])

  return (
    <Modal title={'Sản phẩm thuộc bộ siêu tập: '} open={isOpen} width={'70vw'} footer={null} onCancel={() => setIsModalOpen((prev: boolean) => !prev)}>
      <ProductCollectionDetailTable data={data}/>
    </Modal>
  )
}

export default CollectionModal
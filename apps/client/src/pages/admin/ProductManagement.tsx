import { Button, Form, Space } from 'antd';
import { useEffect, useState } from 'react'
import ProductModal from '../../components/Modal/ProductModal';
import ProductTable from '../../components/Table/Product/ProductTable';
import IProduct from '../../interface/Product';
import { fetchAllProducts } from '../../api/admin/ProductAPI';


const ProductManagement = () => {
  const [data, setData] = useState<IProduct[]>();
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();

  useEffect(()=> {
    fetchAllProducts().then(data => setData(data.data));
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button 
          type="primary" 
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
          }}>Thêm mới</Button>
        {renderModal(isModalOpen, setIsModalOpen, isEditing, setIsEditing, selectedItem)}
        <ProductTable data={data} setSelectedItem={setSelectedItem} setIsEditing={setIsEditing} setIsModalOpen={setIsModalOpen} />
      </Space>
    </>
  )
}

function renderModal(isOpen: boolean, setIsModalOpen: Function, isEditing: boolean, setIsEditing: Function, selectedItem?: IProduct)  {
  if (isOpen === false)
    return null;

  if (isEditing === true)
    return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} isEditing={true} setIsEditing={setIsEditing} selectedItem={selectedItem}/>
  else
    return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} isEditing={false} setIsEditing={setIsEditing} />
}

export default ProductManagement
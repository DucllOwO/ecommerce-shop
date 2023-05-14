import { Button, Form, Space } from 'antd';
import { useEffect, useState } from 'react'
import ProductModal from '../../components/Modal/ProductModal';
import ProductTable from '../../components/Table/Product/ProductTable';
import { ProductType } from '../../components/Table/Product/ProductTable'
import { IProduct } from '../../interface/Product';
import { fetchAllProducts } from '../../api/admin/ProductAPI';

const originData: ProductType[] = [];
for (let i = 0; i < 15; i++) {
  originData.push({
    id: i.toString(),
    name: `Product ${i}`,
    description: `Description ${i}`,
    image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    sold: i + 100,
    view: i + 200
  });
}

const ProductManagement = () => {
  const [data, setData] = useState<IProduct[]>();
  const [isEditing, setIsEditing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=> {
    fetchAllProducts().then(data => setData(data.data));
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary">Thêm mới</Button>
        {renderModal(isModalOpen, setIsModalOpen, isEditing, setIsEditing)}
        <ProductTable data={data} setData={setData} setIsEditing={setIsEditing} setIsModalOpen={setIsModalOpen} />
      </Space>
    </>
  )
}

function renderModal(isOpen: boolean, setIsModalOpen: Function, isEditing: boolean, setIsEditing: Function) {
  if (isOpen === false)
    return null;

  if (isEditing === true)
    return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} isEditing={true} setIsEditing={setIsEditing} />
  else
    return <ProductModal isOpen={isOpen} setIsModalOpen={setIsModalOpen} isEditing={false} setIsEditing={setIsEditing} />
}

export default ProductManagement
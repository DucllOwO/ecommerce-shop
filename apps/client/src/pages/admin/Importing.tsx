import { Space } from 'antd';
import { useState, useEffect } from 'react'
import ImportingModal from '../../components/Modal/ImportingModal';
import ImportingTable from '../../components/Table/ImportingTable'
import { fetchAllProducts } from '../../api/admin/productAPI';
import ImportingReadModal from '../../components/Modal/ImportingReadModal';
import IProduct from '../../interface/Product';

const Importing = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [data, setData] = useState<IProduct[]>();
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setData(data.data);
    }).finally(() => setLoading(false))
  }, [selectedItem])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <ImportingTable data={data} setIsModalOpen={setIsImportModalOpen} setIsReadOnly={setIsReadModalOpen} setSelectedItem={setSelectedItem} />
      <ImportingModal isOpen={isImportModalOpen} setIsModalOpen={setIsImportModalOpen} selectedItem={selectedItem} />
      <ImportingReadModal isOpen={isReadModalOpen} setIsModalOpen={setIsReadModalOpen} data={selectedItem?.product_item} />
    </Space>
  )
}

export default Importing
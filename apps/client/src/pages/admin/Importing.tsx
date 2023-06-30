import { Button, Space } from 'antd';
import { useState, useEffect } from 'react'
import ImportingModal from '../../components/Modal/ImportingModal';
import ImportingTable from '../../components/Table/ImportingTable'
import { IImporting } from '../../interface/Importing';
import { getAllImport } from '../../api/admin/importAPI';
import { fetchAllProducts } from '../../api/admin/productAPI';
import ImportingReadModal from '../../components/Modal/ImportingReadModal';
import IProduct from '../../interface/Product';

// const originData: ImportingType[] = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     id: i.toString(),
//     date: '12-05-2002',
//     total_amount: i * 10,
//     total_price: i * 12050
//   });
// }


const Importing = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [data, setData] = useState<IProduct[]>();
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setData(data.data);
    })
  }, [selectedItem])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <ImportingTable data={data} setIsModalOpen={setIsImportModalOpen} setIsReadOnly={setIsReadModalOpen} setSelectedItem={setSelectedItem}/>
      <ImportingModal isOpen={isImportModalOpen} setIsModalOpen={setIsImportModalOpen} selectedItem={selectedItem} />
      {isReadModalOpen && <ImportingReadModal isOpen={isReadModalOpen} setIsModalOpen={setIsReadModalOpen} data={selectedItem?.product_item} />}
    </Space>
  )
}

export default Importing
import { Button, Space } from 'antd';
import { useState } from 'react'
import ImportingModal from '../../components/Modal/ImportingModal';
import ImportingTable, { ImportingType } from '../../components/Table/ImportingTable'

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
  const [data, setData] = useState<I>

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setIsImportModalOpen(prev => !prev)}>Nhập hàng</Button>
      <ImportingTable data={originData} setIsModalOpen={setIsImportModalOpen} />
      <ImportingModal isOpen={isImportModalOpen} setIsModalOpen={setIsImportModalOpen} />
    </Space>
  )
}

export default Importing
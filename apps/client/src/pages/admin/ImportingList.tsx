import { Space } from 'antd';
import { useState, useEffect } from 'react'
import ImportingListTable from '../../components/Table/ImportingListTable'
import { IImporting } from '../../interface/Importing';
import { getAllImport } from '../../api/admin/importAPI';
import ImportingReadModal from '../../components/Modal/ImportingReadModal';

const ImportingList = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [data, setData] = useState<IImporting[]>([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IImporting>();

  useEffect(() => {
    getAllImport().then((data) => {
      setData(data.data);
    })
  }, [])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <ImportingListTable data={data} setSelectedItem={setSelectedItem} setIsModalOpen={setIsImportModalOpen} setIsReadOnly={setIsReadOnly} />
      <ImportingReadModal isOpen={isImportModalOpen} data={selectedItem?.ImportDetail} setIsModalOpen={setIsImportModalOpen} isReadOnly={isReadOnly} setIsReadOnly={setIsReadOnly} />
    </Space>
  )
}

export default ImportingList
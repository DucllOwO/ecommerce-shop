import { Space, Spin } from 'antd';
import { useState, useEffect } from 'react'
import ImportingListTable from '../../components/Table/ImportingListTable'
import { IImporting } from '../../interface/Importing';
import { getAllImport } from '../../api/admin/importAPI';
import ImportingReadModal from '../../components/Modal/ImportingReadModal';

const ImportingList = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [data, setData] = useState<IImporting[]>([]);
  const [selectedItem, setSelectedItem] = useState<IImporting>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllImport().then((data) => {
      setData(data.data);
    }).finally(() => setLoading(false))
  }, [])

  return (
    <Spin spinning={loading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <ImportingListTable data={data} setSelectedItem={setSelectedItem} setIsModalOpen={setIsImportModalOpen} />
        <ImportingReadModal isOpen={isImportModalOpen} data={selectedItem?.ImportDetail ? selectedItem?.ImportDetail : []} setIsModalOpen={setIsImportModalOpen} />
      </Space>
    </Spin>
  )
}

export default ImportingList
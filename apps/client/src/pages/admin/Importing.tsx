import { Input, Space, Spin } from 'antd';
import { useState, useEffect, ChangeEvent } from 'react'
import ImportingModal from '../../components/Modal/ImportingModal';
import ImportingTable from '../../components/Table/ImportingTable'
import { fetchAllProducts } from '../../api/admin/productAPI';
import ImportingReadModal from '../../components/Modal/ImportingReadModal';
import IProduct from '../../interface/Product';
import { searchDatabyPropertyName } from '../../helper/tableSorter';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import ImportingQuantityModal from '../../components/Modal/ImportingQuantityModal';

const Importing = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [data, setData] = useState<IProduct[]>();
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      setData(data.data);
      setSearchData(data.data);
    }).finally(() => setLoading(false))
  }, [selectedItem])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const text = e.target.value;
      setSearchText(text);
      if (text.length > 0)
        data && setSearchData(searchDatabyPropertyName(data, text, 'name'))
      else
        data && setSearchData(data);
    } catch (error) {
      console.log("🚀 ~ file: Tag.tsx:44 ~ onChange ~ error:", error)
      ErrorAlert('Đã có lỗi khi tìm kiếm sản phẩm theo tên!!!')
    }

  }

  return (
    <Spin spinning={loading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Input.Search value={searchText} size="middle" placeholder="Nhập tên sản phẩm" enterButton style={{ width: '20%' }} onChange={onChange} />
        <ImportingTable data={searchData} setIsModalOpen={setIsImportModalOpen} setIsReadOnly={setIsReadModalOpen} setSelectedItem={setSelectedItem} />
        <ImportingModal isOpen={isImportModalOpen} setIsModalOpen={setIsImportModalOpen} selectedItem={selectedItem} />
        <ImportingQuantityModal isOpen={isReadModalOpen} setIsModalOpen={setIsReadModalOpen} data={selectedItem?.product_item} />
      </Space>
    </Spin>
  )
}

export default Importing
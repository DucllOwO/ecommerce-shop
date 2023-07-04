import { Button, Input, Space, Spin } from 'antd';
import { useEffect, useState, ChangeEvent } from 'react'
import VoucherTable from '../../components/Table/VoucherTable'
import IVoucher from '../../interface/Voucher';
import { fetchAllVouchers } from '../../api/admin/VoucherAPI';
import VoucherCreateModal from '../../components/Modal/VoucherCreateModal';
import { searchDatabyPropertyName } from '../../helper/tableSorter';
import ErrorAlert from '../../components/Alert/ErrorAlert';

const Voucher = () => {
  const [data, setData] = useState<IVoucher[]>();
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IVoucher[]>([]);
  useEffect(() => {
    fetchAllVouchers().then((data) => {
      setData(data.data);
      setSearchData(data.data);
    }).finally(() => setIsLoading(false))
  }, [])

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
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space direction='horizontal'>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
          <Input.Search value={searchText} size="middle" placeholder="Nhập tên nhãn" enterButton style={{ width: '100%' }} onChange={onChange} />
        </Space>
        <VoucherTable data={searchData} setData={setSearchData} />
      </Space>
      <VoucherCreateModal setDataState={setSearchData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Spin>
  )
}

export default Voucher
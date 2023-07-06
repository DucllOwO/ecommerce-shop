import { Button, Input, Space, Spin } from 'antd'
import { useEffect, useState, ChangeEvent } from 'react'
import DiscountTable from '../../components/Table/Discount/DiscountTable'
import IDiscount from '../../interface/Discount';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import DiscountCreateModal from '../../components/Modal/DiscountCreateModal';
import { searchDatabyPropertyName } from '../../helper/tableSorter';
import ErrorAlert from '../../components/Alert/ErrorAlert';

const Discount = () => {
  const [data, setData] = useState<IDiscount[]>();
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setisModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IDiscount[]>([]);

  useEffect(() => {
    fetchAllDiscounts().then((data) => {
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
      ErrorAlert('Đã có lỗi khi tìm kiếm sản phẩm theo tên!!!')
    }

  }

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space direction='horizontal'>
          <Button type="primary" onClick={() => setisModalOpen(true)}>Thêm mới</Button>
          <Input.Search value={searchText} size="middle" placeholder="Nhập tên giảm giá" enterButton style={{ width: '100%' }} onChange={onChange} />
        </Space>
        <DiscountTable data={searchData} setData={setSearchData} />
      </Space>
      <DiscountCreateModal setDataState={setSearchData} isOpen={isModalOpen} setIsModalOpen={setisModalOpen} />
    </Spin>
  )
}

export default Discount
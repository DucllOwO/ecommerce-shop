import { ChangeEvent, useEffect, useState } from 'react'
import CustomerManagementTable from '../../components/Table/CustomerManagement';
import IUser from '../../interface/User';
import { fetchAllCustomers } from '../../api/admin/CustomerAPI';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { combineAndRemoveDuplicates, searchDatabyPropertyName } from '../../helper/tableSorter';
import { Input, Space, Spin } from 'antd';

const CustomerManagement = () => {
  const [data, setData] = useState<IUser[]>();
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAllCustomers().then(data => {
      setData(data.data);
      setSearchData(data.data);
    }).finally(() => setLoading(false))
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const text = e.target.value;
      setSearchText(text);
      if (text.length > 0)
        data && setSearchData(combineAndRemoveDuplicates(searchDatabyPropertyName(data, text, 'firstname'), searchDatabyPropertyName(data, text, 'lastname')))
      else
        data && setSearchData(data);
    } catch (error) {
      console.log("🚀 ~ file: OrderTable.tsx:89 ~ onChange ~ error:", error)
      ErrorAlert('Đã có lỗi khi tìm kiếm sản phẩm theo tên!!!')
    }

  }

  return (
    <Spin spinning={loading}>

      <Space direction='vertical' style={{ width: '100%' }}>
        <Input.Search value={searchText} size="middle" placeholder="Nhập tên bộ sưu tập" enterButton style={{ width: '20%' }} onChange={onChange} />
        <CustomerManagementTable data={searchData} setData={setSearchData} />
      </Space>
    </Spin>
  )
}

export default CustomerManagement
import { Button, Form, Input, Space, Spin } from 'antd';
import { useEffect, useState, ChangeEvent } from 'react'
import CollectionTable from '../../components/Table/CollectionTable'
import ICollection from '../../interface/Collection';
import { fetchAllCollection } from '../../api/admin/productAPI';
import CollectionCreateModal from '../../components/Modal/CollectionCreateModal';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import IDiscount from '../../interface/Discount';
import { searchDatabyPropertyName } from '../../helper/tableSorter';
import ErrorAlert from '../../components/Alert/ErrorAlert';

const Collection = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ICollection[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState<IDiscount[]>();
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<ICollection[]>([]);


  useEffect(() => {
    fetchAllCollection().then((data) => {
      setData(data.data);
      setSearchData(data.data);
      fetchAllDiscounts().then((data) => {
        setDiscounts(data.data.map((item: IDiscount) => {
          return { value: item.id, label: `${item.name} - ${item.discount}%` };
        }));
      });
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
          <Input.Search value={searchText} size="middle" placeholder="Nhập tên bộ sưu tập" enterButton style={{ width: '100%' }} onChange={onChange} />
        </Space>
        <Form form={form} component={false}>
          <CollectionTable form={form} data={searchData} setData={setSearchData} discounts={discounts} />
        </Form>
      </Space>
      <CollectionCreateModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setDataState={setSearchData} discounts={discounts} />
    </Spin>
  )
}

export default Collection
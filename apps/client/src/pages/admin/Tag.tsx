import { Button, Form, Input, Space, Spin } from 'antd';
import { useEffect, useState, ChangeEvent } from 'react'
import TagTable from '../../components/Table/Tag/TagTable'
import ITag from '../../interface/Tag';
import TagCreateModal from '../../components/Modal/TagCreateModal';
import { fetchAllTag } from '../../api/admin/tagAPI';
import IDiscount from '../../interface/Discount';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { searchDatabyPropertyName } from '../../helper/tableSorter';

const Tag = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ITag[]>();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [discounts, setDiscounts] = useState<IDiscount[]>()
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<ITag[]>([]);

  useEffect(() => {
    setIsLoading(true)
    fetchAllTag().then(data => {
      console.log(data.data)
      setData(data.data);
      setSearchData(data.data)
      fetchAllDiscounts().then((data) => {
        setDiscounts(data.data.map((item: IDiscount) => {
          return { value: item.id, label: `${item.name} - ${item.discount}%` };
        }));
      });
    }).finally(() => setIsLoading(false));
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
        <Form form={form} component={false}>
          <TagTable form={form} data={searchData} setData={setSearchData} discounts={discounts} />
        </Form>
      </Space>
      <TagCreateModal setDataState={setSearchData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} discounts={discounts} />
    </Spin>
  )
}

export default Tag
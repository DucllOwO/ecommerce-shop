import { Button, Form, Space, Spin } from 'antd';
import { useEffect, useState } from 'react'
import TagTable from '../../components/Table/Tag/TagTable'
import ITag from '../../interface/Tag';
import TagCreateModal from '../../components/Modal/TagCreateModal';
import { fetchAllTag } from '../../api/admin/tagAPI';
import IDiscount from '../../interface/Discount';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import ErrorAlert from '../../components/Alert/ErrorAlert';

const Tag = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ITag[]>();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [discounts, setDiscounts] = useState<IDiscount[]>()

  useEffect(() => {
    setIsLoading(true)
    fetchAllTag().then(data => {
      console.log(data.data)
      setData(data.data);
      fetchAllDiscounts().then((data) => {
        setDiscounts(data.data.map((item: IDiscount) => {
          return { value: item.id, label: `${item.name} - ${item.discount}%` };
        }));
      });
    }).finally(() => setIsLoading(false));
  }, [])

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
        <Form form={form} component={false}>
          <TagTable form={form} data={data} setData={setData} discounts={discounts} />
        </Form>
      </Space>
      <TagCreateModal setDataState={setData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} discounts={discounts} />
    </Spin>
  )
}

export default Tag
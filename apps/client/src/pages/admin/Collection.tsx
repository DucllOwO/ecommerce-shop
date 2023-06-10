import { Button, Form, Space, Spin } from 'antd';
import { useEffect, useState } from 'react'
import CollectionTable from '../../components/Table/CollectionTable'
import ICollection from '../../interface/Collection';
import { fetchAllCollection } from '../../api/admin/ProductAPI';
import CollectionCreateModal from '../../components/Modal/CollectionCreateModal';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import IDiscount from '../../interface/Discount';

const Collection = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ICollection[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState<IDiscount[]>()


  useEffect(() => {
    fetchAllCollection().then((data) => {
      console.log(data.data)
      setData(data.data);
      fetchAllDiscounts().then((data) => {
        setDiscounts(data.data.map((item: IDiscount) => {
          return { value: item.id, label: `${item.name} - ${item.discount}%` };
        }));
      });
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary">Thêm mới</Button>
        <Form form={form} component={false}>
          <CollectionTable form={form} data={data} setData={setData} discounts={discounts}/>
        </Form>
      </Space>
      <CollectionCreateModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Spin>
  )
}

export default Collection
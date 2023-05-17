import { Button, Form, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import DiscountTable from '../../components/Table/Discount/DiscountTable'
import IDiscount from '../../interface/Discount';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';
import DiscountCreateModal from '../../components/Modal/DiscountCreateModal';

const Discount = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IDiscount[]>();
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setisModalOpen] = useState(false)

  useEffect(() => {
    fetchAllDiscounts().then((data) => {
      setData(data.data);
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setisModalOpen(true)}>Thêm mới</Button>
        <Form form={form} component={false}>
          <DiscountTable form={form} data={data} setData={setData} />
        </Form>
      </Space>
      <DiscountCreateModal isOpen={isModalOpen} setIsModalOpen={setisModalOpen} />
    </Spin>
  )
}

export default Discount
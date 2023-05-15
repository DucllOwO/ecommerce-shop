import { Button, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import DiscountTable from '../../components/Table/Discount/DiscountTable'
import Discount from '../../interface/Discount';
import { fetchAllDiscounts } from '../../api/admin/DiscountAPI';

// const originData: DiscountType[] = [];
// for (let i = 0; i < 10; i++) {
//   originData.push({
//     id: i.toString(),
//     name: `Discount ${i}`,
//     discount: i + 10,
//   });
// }

const Discount = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Discount[]>();

  useEffect(() => {
    fetchAllDiscounts().then((data) => {
      setData(data.data);
    })    
  },[])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary">Thêm mới</Button>
      <Form form={form} component={false}>
        <DiscountTable form={form} data={data} setData={setData} />
      </Form>
    </Space>
  )
}

export default Discount
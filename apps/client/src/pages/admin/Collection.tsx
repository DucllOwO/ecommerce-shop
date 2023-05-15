import { Button, Form, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import CollectionTable from '../../components/Table/CollectionTable'
import ICollection from '../../interface/Collection';
import { fetchAllCollection } from '../../api/admin/ProductAPI';

// const originData: CollectionType[] = [];
// for (let i = 0; i < 15; i++) {
//   originData.push({
//     id: i.toString(),
//     name: `Collection ${i}`,
//     discount: i + 10,
//   });
// }

const Collection = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ICollection[]>();

  useEffect(()=> {
    fetchAllCollection().then((data) => {
      setData(data.data);
    })
  }, [])

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary">Thêm mới</Button>
      <Form form={form} component={false}>
        <CollectionTable form={form} data={data} setData={setData} />
      </Form>
    </Space>
  )
}

export default Collection
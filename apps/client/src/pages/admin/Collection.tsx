import { Button, Form, Space } from 'antd';
import React, { useState } from 'react'
import CollectionTable, { CollectionType } from '../../components/Table/CollectionTable'

const originData: CollectionType[] = [];
for (let i = 0; i < 15; i++) {
  originData.push({
    id: i.toString(),
    name: `Collection ${i}`,
    discount: i + 10,
  });
}

const Collection = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

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
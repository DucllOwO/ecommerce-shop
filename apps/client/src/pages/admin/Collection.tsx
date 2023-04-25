import { Form } from 'antd';
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
    <Form form={form} component={false}>
      <CollectionTable form={form} data={data} setData={setData} />
    </Form>
  )
}

export default Collection
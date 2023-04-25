import { Button, Form, Space } from 'antd';
import { useState } from 'react'
import TagTable, { TagType } from '../../components/Table/Tag/TagTable'


const originData: TagType[] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    id: i.toString(),
    name: `Tag ${i}`,
    discount: i,
  });
}

const Tag = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Button type="primary">Thêm mới</Button>
      <Form form={form} component={false}>
        <TagTable form={form} data={data} setData={setData} />
      </Form>
    </Space>
  )
}

export default Tag
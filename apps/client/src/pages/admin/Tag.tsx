import { Form } from 'antd';
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
    <Form form={form} component={false}>
      <TagTable form={form} data={data} setData={setData} />
    </Form>
  )
}

export default Tag
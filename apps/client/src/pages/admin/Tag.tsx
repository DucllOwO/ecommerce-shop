import { Button, Form, Space } from 'antd';
import { useEffect, useState } from 'react'
import TagTable from '../../components/Table/Tag/TagTable'
import { fetchAllTag } from '../../api/admin/ProductAPI';
import Tag from '../../interface/Tag';


// const originData: TagType[] = [];
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     id: i.toString(),
//     name: `Tag ${i}`,
//     discount: i,
//   });
// }

const Tag = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Tag[]>();

  useEffect(() => {
    fetchAllTag().then(data => setData(data.data));
  }, [])

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
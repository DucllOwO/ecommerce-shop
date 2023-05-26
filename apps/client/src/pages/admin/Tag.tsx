import { Button, Form, Space, Spin } from 'antd';
import { useEffect, useState } from 'react'
import TagTable from '../../components/Table/Tag/TagTable'
import { fetchAllTag } from '../../api/admin/ProductAPI';
import ITag from '../../interface/Tag';
import TagCreateModal from '../../components/Modal/TagCreateModal';

const Tag = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<ITag[]>();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTag().then(data => setData(data.data)).finally(() => setIsLoading(false));
  }, [])

  return (
    <Spin spinning={isLoading}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
        <Form form={form} component={false}>
          <TagTable form={form} data={data} setData={setData} />
        </Form>
      </Space>
      <TagCreateModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Spin>
  )
}

export default Tag
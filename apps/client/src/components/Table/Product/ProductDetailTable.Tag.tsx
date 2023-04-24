import React from 'react'
import { Card, Table, Image, Space, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';

const { Text } = Typography;


interface DataType {
  key?: string;
  id: number;
  name: string;
  image: string;
  tag: string[];
}

const data = [
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    tag: ['shirt', 'hoodie', 'winter',]
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Sản phẩm',
    key: 'name_image',
    render: (text, record) => {
      return <Space direction='horizontal'>
        <Image width={100} height={150} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        <Text>{record.name}</Text>
      </Space>
    },
  },
  {
    title: 'Nhãn',
    dataIndex: 'tag',
    key: 'tag',
    render: (_, { tag }) => {
      return <Space direction='horizontal' wrap>
        {tag.map((value) => {
          return <Tag>{value}</Tag>
        })}
      </Space>
    },
  },
];

const ProductTagDetailTable = () => {
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  )
}

export default ProductTagDetailTable
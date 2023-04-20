import React from 'react'
import { Card, Table, Image, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';

const { Text } = Typography;

const { Meta } = Card;

interface DataType {
  key?: string;
  id: number;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

const data = [
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
  },
  {
    id: 1,
    name: 'Ao vang khe',
    image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    color: 'Vang',
    size: 'XL',
    quantity: 10,
    price: 1000000000,
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
    title: 'Màu',
    dataIndex: 'color',
    key: 'color',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Kích cỡ',
    dataIndex: 'size',
    key: 'size',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Gía',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <p>{text}</p>,
  },
];

const ProductItemTable = () => {
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />
  )
}

export default ProductItemTable
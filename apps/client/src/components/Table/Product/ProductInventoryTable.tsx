import { Card, Table, Image, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

const { Meta } = Card;

interface DataType {
  color: string;
  size: string;
  quantity: number;
}

const data = [
  {
    color: 'Đỏ',
    size: 'XL',
    quantity: 20
  },
  {
    color: 'Vàng',
    size: 'XL',
    quantity: 20
  },
  {
    color: 'Xanh',
    size: 'XL',
    quantity: 20
  },
  {
    color: 'Nâu',
    size: 'XL',
    quantity: 20
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Kích cỡ',
    dataIndex: 'size',
    key: 'size',
    render: (text) => <p>{text}</p>,
    onCell: (_, index: number | undefined) => {
      let a = index && index % 4;
      if (index != undefined && index % 4 == 0)
        return { rowSpan: 4 }
      return { rowSpan: 0 }
    }
  },
  {
    title: 'Màu',
    dataIndex: 'color',
    key: 'color',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text) => <p>{text}</p>,
  },
];

const ProductInventoryTable = () => {
  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
}

export default ProductInventoryTable
import { Image, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../../interface/Product';

const { Text } = Typography;

// interface DataType {
//   id: number;
//   name: string;
//   image: string;
//   color: string;
//   size: string;
//   price: number;
//   view: number;
//   sold: number;
// }

// const data = [
//   {
//     id: 1,
//     name: 'Ao vang khe',
//     image: 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
//     color: 'Vang',
//     size: 'XL',
//     price: 1000000000,
//     view: 1000000000,
//     sold: 1000000000,
//   }
// ]

const columns: ColumnsType<IProduct> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Sản phẩm',
    key: 'name_image',
    fixed: 'left',
    render: (text, record) => {
      return <Space direction='horizontal'>
        <Image width={100} height={150} alt="example" src={record.image[0]} />
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
    title: 'Gía',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Lượt xem',
    dataIndex: 'view',
    key: 'view',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Số lượng bán',
    dataIndex: 'sold',
    key: 'sold',
    render: (text) => <p>{text}</p>,
  },
];

const ProductCollectionDetailTable = (props: TableProps) => {
  return (
    <Table columns={columns} dataSource={props.data} pagination={{ pageSize: 4 }} />
  )
}

type TableProps = {
  data?: IProduct[]
}

export default ProductCollectionDetailTable
import { Image, Space, Table, Typography, } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { formatNumberWithComma } from '../../../helper/utils';
import IProduct from '../../../interface/Product';


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
        <Image className='imgborder' width={100} height={130} alt="example" src={record.image[0]} />
        <Typography.Text>{record.name}</Typography.Text>
      </Space>
    },
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <p>{formatNumberWithComma(text)}</p>,
  },
  {
    title: 'Lượt xem',
    dataIndex: 'view',
    key: 'view',
    render: (text) => <p>{formatNumberWithComma(text)}</p>,
  },
  {
    title: 'Số lượng bán',
    dataIndex: 'sold',
    key: 'sold',
    render: (text) => <p>{formatNumberWithComma(text)}</p>,
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
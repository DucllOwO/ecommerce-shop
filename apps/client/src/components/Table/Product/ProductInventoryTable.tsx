import { Table } from 'antd';
interface Product {
  id?: number;
  color: string;
  size: string;
  quantity: number;
}

const data: Product[] = [
  { id: 1, color: 'red', size: 'S', quantity: 5 },
  { id: 2, color: 'red', size: 'M', quantity: 10 },
  { id: 3, color: 'red', size: 'L', quantity: 10 },
  { id: 4, color: 'red', size: 'XL', quantity: 10 },
  { id: 5, color: 'red', size: 'XXL', quantity: 10 },
  { id: 1, color: 'blue', size: 'S', quantity: 5 },
  { id: 2, color: 'blue', size: 'M', quantity: 10 },
  { id: 3, color: 'blue', size: 'L', quantity: 10 },
  { id: 4, color: 'blue', size: 'XL', quantity: 10 },
  { id: 5, color: 'blue', size: 'XXL', quantity: 10 },
];

const ProductInventoryTable = () => {
  const columns = [
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (text: string, record: Product, index: number) => {
        if (index % 5 === 0) {
          return {
            children: text,
            props: {
              rowSpan: 5,
            },
          };
        }
        return {
          props: {
            rowSpan: 0,
          },
        };
      },
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá nhập',
    },
    {
      title: 'Giá bán',
    },
  ];

  return (
    <>
      <Table
        className="custom-table-no-hover"
        columns={columns}
        dataSource={data} pagination={false} bordered />
    </>
  );
}

export default ProductInventoryTable
import { useState } from 'react'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';

interface DataType {
  id: string;
  customer_name: string;
  total_price: number;
  date: string;
}

const data = [
  {
    id: '1',
    customer_name: 'ducccc',
    total_price: 10000000,
    date: '12-05-2002'
  }
]

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customer_name',
    key: 'customer_name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <p>{'12-05-2003'}</p>,
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total_price',
    key: 'total_price',
    render: (text) => <p>{text}</p>,
  },
];

const ReceiptTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <OrderModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (!(isClickOnAnSVGTag(event) || isClickOnAnImgTag(event)))
                setIsModalOpen(prev => !prev)
            }, // click row
          };
        }}
      />
    </>
  )
}

export default ReceiptTable
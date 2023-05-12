import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';

interface DataType {
  key?: string;
  id: number;
  date: string;
  customer_name: string;
  total_amount: number;
}

const data = [
  {
    id: 1,
    date: '2018-04-24 18:00:00',
    customer_name: 'Nguyen tri Duck',
    total_amount: 1000000000,
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: 'Tổng tiền',
    key: 'total_amount',
    dataIndex: 'total_amount',
    render: (text) => (
      text
    ),
  },
];

const OrderTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <OrderModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table columns={columns} dataSource={data} style={{ height: TABLE_HEIGHT }} onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (!(isClickOnAnSVGTag(event) || isClickOnAnImgTag(event)))
              setIsModalOpen(prev => !prev)
          }, // click row
        };
      }} />
    </>
  )
}

export default OrderTable
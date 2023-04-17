import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';

interface DataType {
  key: string;
  id: string;
  date: number;
  customer_name: string;
  total_amount: number;
}

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
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Tổng tiền',
    key: 'total_cost',
    dataIndex: 'total_cost',
    render: (_, { total_amount }) => (
      '1'
    ),
  },
];

const OrderTable = () => {
  return (
    <Table columns={columns} style={{ height: TABLE_HEIGHT }} />
  )
}

export default OrderTable
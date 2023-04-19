import React from 'react'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  id: string;
  name: number;
  discount: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên khách hàng',
    key: 'name',
  },
  {
    title: 'Ngày',
    key: 'discount',
  },
  {
    title: 'Tổng tiền',
    key: 'discount',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: "10%"
  },
];

const ReceiptTable = () => {
  return (
    <Table columns={columns} />
  )
}

export default ReceiptTable
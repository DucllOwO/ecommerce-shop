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
    title: 'Code',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên khuyến mãi',
    key: 'name',
  },
  {
    title: 'Ngày hết hạn',
    key: 'discount',
  },
  {
    title: 'Giảm giá',
    key: 'discount',
  },
  {
    title: 'Mô tả',
    key: 'discount',
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: "10%"
  },
];


const DiscountTable = () => {
  return (
    <Table columns={columns} />
  )
}

export default DiscountTable
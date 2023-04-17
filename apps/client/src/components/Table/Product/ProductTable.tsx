import React from 'react'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';

interface DataType {
  key: string;
  id: string;
  name: number;
  description: string;
  image: string;
  view: number;
  sold: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Sản phẩm',
    key: 'name_image',
  },
  {
    title: 'Gía',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Lượt xem',
    dataIndex: 'view',
    key: 'view',
  },
  {
    title: 'Bán',
    dataIndex: 'sold',
    key: 'sold',
  },
  {
    title: 'Thao tác',
    key: 'action',
  },
];

const ProductTable = () => {
  return (
    <Table columns={columns} />
  )
}

export default ProductTable
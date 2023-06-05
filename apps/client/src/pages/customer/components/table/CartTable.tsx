import { Button, Image, InputNumber, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import productData from '../../../../assets/fake-data/products';
import LocalStorage from '../../../../helper/localStorage';

export type CartItemType = {
  image01: string,
  quantity: string,
  title: string,
  color: string,
  size: string,
  slug: string
}


const columns: ColumnsType<any> = [
  {
    title: 'Sản phẩm',
    key: '1',
    width: '15%',
    render: (text, record) => {
      return <Image src={record.image[0]} />
    },
  },
  {
    title: '',
    key: '2',
    width: '30%',
    render: (text, record) => {
      return <Space style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}>
        <p>{record.name}</p>
        <p>{record.size}</p>
      </Space>
    },
  },
  {
    title: 'Đơn giá',
    key: '3',
    width: '15%',
    render: (text, record) => {
      return <p>{record.price}</p>
    },
  },
  {
    title: 'Số lượng',
    key: '4',
    width: '15%',
    dataIndex: 'tags',
    render: (_, record) => {
      return <InputNumber defaultValue={record.quantity}/>
    }
  },
  {
    title: 'Tổng tiền',
    key: '5',
    width: '25%',
    dataIndex: 'tags',
    render: (text, record) => {
      return <p>{record.price*record.quantity}</p>
    }
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => {
      return <Button>Xóa</Button>
    }
  },
];

const CartTable = () => {
  return (
    <Table columns={columns} dataSource={LocalStorage.getItem('cart')} scroll={{ x: '100%' }} ></Table>
  )
}

export default CartTable
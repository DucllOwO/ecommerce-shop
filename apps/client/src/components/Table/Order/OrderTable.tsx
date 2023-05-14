import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';
import { IOrder } from '../../../interface/Order';
import { fetchWaitingOrders, fetchCompletedOrders } from '../../../api/admin/OrderAPI';

// interface DataType {
//   key?: string;
//   id: number;
//   date: string;
//   customer_name: string;
//   total_amount: number;
// }

// const data = [
//   {
//     id: 1,
//     date: '2018-04-24 18:00:00',
//     customer_name: 'Nguyen tri Duck',
//     total_amount: 1000000000,
//   },
// ]

const columns: ColumnsType<IOrder> = [
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
    render: (_, record) => <p>{`${record.buyer.lastname} ${record.buyer.firstname}`}</p>
  },
  {
    title: 'Tổng tiền',
    key: 'total_cost',
    dataIndex: 'total_cost',
    render: (text) => (
      text
    ),
  },
];

const OrderTable = (props: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IOrder[]>();

  useEffect(()=> {
    console.log(data)
    if(props.state === 'waiting')
      fetchWaitingOrders().then(data => setData(data.data)); 
    else
      fetchCompletedOrders().then(data => setData(data.data));
  },[props.state])

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

interface OrderProps{
  state: string
}

export default OrderTable
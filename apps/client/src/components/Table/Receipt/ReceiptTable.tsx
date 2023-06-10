import { useEffect, useState } from 'react'

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';
import IReceipt from '../../../interface/Receipt';
import { fetchPaidReceipt, fetchUnpaidReceipt } from '../../../api/admin/receiptAPI';
import dayjs from 'dayjs';

// interface DataType {
//   id: string;
//   customer_name: string;
//   total_price: number;
//   date: string;
// }

// const data = [
//   {
//     id: '1',
//     customer_name: 'ducccc',
//     total_price: 10000000,
//     date: '12-05-2002'
//   }
// ]

const columns: ColumnsType<IReceipt> = [
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
    render: (_, record) => <p>{`${record.order.lastname} ${record.order.firstname}`}</p>,
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <p>{dayjs(text).format("HH:mm DD/MM/YYYY")}</p>,
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'cost',
    key: 'cost',
    render: (text) => <p>{text}</p>,
  },
];

const ReceiptTable = (props: ReceiptTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IReceipt[]>();

  useEffect(()=> {
    // console.log(props.state);
    if(props.state === 'paid')
      fetchPaidReceipt().then(data => setData(data.data));
    else 
      fetchUnpaidReceipt().then(data => setData(data.data)); 
  }, [props.state])

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

interface ReceiptTableProps{
  state: string
}

export default ReceiptTable
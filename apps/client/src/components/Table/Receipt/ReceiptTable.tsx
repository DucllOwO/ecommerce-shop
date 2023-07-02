import { useEffect, useState } from 'react'

import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';
import IReceipt from '../../../interface/Receipt';
import { fetchPaidReceipt, fetchUnpaidReceipt, paidReceipt } from '../../../api/admin/receiptAPI';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ReceiptModal from '../../Modal/ReceiptModal';

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


const ReceiptTable = (props: ReceiptTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IReceipt[]>();
  const [selectedReceipt, setSelectedReceipt] = useState<IReceipt>();

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
    props.state === "unpaid" ? {
      title: 'Thao tác',
      key: 'Action',
      render: (_, record) => 
        <Button 
          style={{marginRight: 10}}
          onClick={() => handlePaidOnClick(record)}
        >Đã thanh toán</Button>
    } : {}
  ];

  const handlePaidOnClick = (item: IReceipt) => {
    paidReceipt(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Thanh toán thành công");
    })
  }
  
  useEffect(()=> {
    // console.log(props.state);
    if(props.state === 'paid')
      fetchPaidReceipt().then(data => setData(data.data));
    else 
      fetchUnpaidReceipt().then(data => setData(data.data)); 
  }, [props.state])

  return (
    <>
      <ReceiptModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedReceipt={selectedReceipt}/>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (!(isClickOnAnSVGTag(event) || isClickOnAnImgTag(event)))
              {  
                console.log(record)
                setSelectedReceipt(record)
                setIsModalOpen(prev => !prev)
              }
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
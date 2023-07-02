import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';
import { fetchWaitingOrders, fetchCompletedOrders, fetchCanceledOrders, deliveryOrder, cancelOrder, fetchDeliveryOrders, finishOrder } from '../../../api/admin/OrderAPI';
import IOrder from '../../../interface/Order';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';

const OrderTable = (props: OrderProps) => {
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
      render: (_, record) => <p>{dayjs(record.date).format("HH:mm:ss DD/MM/YYYY")}</p>
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
    props.state === "waiting" ? {
      title: 'Thao tác',
      key: 'Action',
      render: (_, record) => <div>
        <Button 
          style={{marginRight: 10}}
          onClick={() => handleDeliveryOnClick(record)}
        >Vận chuyển</Button>
        <Button 
          onClick={() => handleCancelOnClick(record)}
        >Huỷ</Button>
      </div>
    } : props.state === "delivery" ? {
      title: 'Thao tác',
      key: 'Action',
      render: (_, record) => 
        <Button 
          style={{marginRight: 10}}
          onClick={() => handleFinishOnClick(record)}
        >Hoàn tất</Button>
    }: {},
  
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrder>();
  const [data, setData] = useState<IOrder[]>();

  const handleDeliveryOnClick = (item: IOrder) => {
    deliveryOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Bắt đầu vận chuyển");
    })
  }
  const handleCancelOnClick = (item: IOrder) => {
    cancelOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Huỷ đơn thành công");
    })
  }
  const handleFinishOnClick = (item: IOrder) => {
    finishOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Hoàn tất đơn hàng");
    })
  }

  useEffect(()=> {
    // console.log(data)
    switch(props.state){
      case 'waiting':
        fetchWaitingOrders().then(data => setData(data.data)); 
        break;
      case 'completed':
        fetchCompletedOrders().then(data => setData(data.data));
        break;
      case 'canceled':
        fetchCanceledOrders().then(data => setData(data.data));
        break;
      case 'delivery':
        fetchDeliveryOrders().then(data => setData(data.data));
    }
  },[props.state])

  return (
    <>
      <OrderModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedOrder={selectedItem} />
      <Table columns={columns} dataSource={data} style={{ height: TABLE_HEIGHT }} onRow={(record : IOrder, rowIndex) => {
        return {
          onClick: (event) => {
            if (!(isClickOnAnSVGTag(event) || isClickOnAnImgTag(event))){
              setIsModalOpen(prev => !prev)
              setSelectedItem(record)
            }
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
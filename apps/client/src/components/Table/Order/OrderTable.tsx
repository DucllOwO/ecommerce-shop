import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import OrderModal from '../../Modal/OrderModal';
import { fetchWaitingOrders, fetchCompletedOrders, fetchCanceledOrders, deliveryOrder, cancelOrder, fetchDeliveryOrders, finishOrder } from '../../../api/admin/OrderAPI';
import { isClickValidToOpenDetail } from '../../../helper/checkEventClick';
import IOrder from '../../../interface/Order';
import SuccessAlert from '../../Alert/SuccessAlert';
import { formatNumberWithComma, formatToFullDate } from '../../../helper/utils';
import { combineAndRemoveDuplicates, compareDates, compareNumber, searchDatabyPropertyName } from '../../../helper/tableSorter';
import ErrorAlert from '../../Alert/ErrorAlert';

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
      defaultSortOrder: 'descend',
      sorter: (a, b) => compareDates(a.date, b.date),
      render: (_, record) => <p>{formatToFullDate(record.date)}</p>
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (_, record) => <p>{`${record.buyer.lastname} ${record.buyer.firstname}`}</p>
    },
    {
      title: 'Tổng tiền (đ)',
      key: 'total_cost',
      dataIndex: 'total_cost',
      sorter: (a, b) => compareNumber(a.total_cost, b.total_cost),
      render: (text) => (
        formatNumberWithComma(text)
      ),
    },
    props.state === "waiting" ? {
      title: 'Thao tác',
      key: 'Action',
      render: (_, record) => <div>
        <Button
          style={{ marginRight: 10 }}
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
          style={{ marginRight: 10 }}
          onClick={() => handleFinishOnClick(record)}
        >Hoàn tất</Button>
    } : {},

  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrder>();
  const [data, setData] = useState<IOrder[]>();
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IOrder[]>([]);

  const handleDeliveryOnClick = (item: IOrder) => {
    deliveryOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      setSearchData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Bắt đầu vận chuyển");
    })
  }
  const handleCancelOnClick = (item: IOrder) => {
    cancelOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      setSearchData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Huỷ đơn thành công");
    })
  }
  const handleFinishOnClick = (item: IOrder) => {
    finishOrder(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      setSearchData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Hoàn tất đơn hàng");
    })
  }

  useEffect(() => {
    setLoading(true)
    switch(props.state){
      case "waiting":
        fetchWaitingOrders().then(data => { setData(data.data); setSearchData(data.data) }).finally(() => setLoading(false));
        break;
      case "canceled":
        fetchCanceledOrders().then(data => { setData(data.data); setSearchData(data.data) }).finally(() => setLoading(false));
        break;
      case "delivery":
        fetchDeliveryOrders().then(data => {setData(data.data); setSearchData(data.data) }).finally(() => setLoading(false));
        break;
      case "completed":
        fetchCompletedOrders().then(data => { setData(data.data); setSearchData(data.data) }).finally(() => setLoading(false));
        break;
    }
  }, [props.state])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const text = e.target.value;
      setSearchText(text);
      if (text.length > 0)
        data && setSearchData(combineAndRemoveDuplicates(searchDatabyPropertyName(data, text, 'firstname'), searchDatabyPropertyName(data, text, 'lastname')))
      else
        data && setSearchData(data);
    } catch (error) {
      console.log("🚀 ~ file: OrderTable.tsx:89 ~ onChange ~ error:", error)
      ErrorAlert('Đã có lỗi khi tìm kiếm sản phẩm theo tên!!!')
    }

  }

  return (
    <>
      <Spin spinning={loading}>
        <Input.Search value={searchText} size="middle" placeholder="Nhập tên khách hàng" enterButton style={{ width: '20%', marginBottom: 10 }} onChange={onChange} />
        <OrderModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedOrder={selectedItem} />
        <Table columns={columns} dataSource={searchData} style={{ height: TABLE_HEIGHT }} onRow={(record: IOrder, rowIndex) => {
          return {
            onClick: (event) => {
              if (isClickValidToOpenDetail(event)) {
                setIsModalOpen(prev => !prev)
                setSelectedItem(record)
              }
            }, // click row
          };
        }} />
      </Spin>
    </>
  )
}

interface OrderProps {
  state: string
}

export default OrderTable
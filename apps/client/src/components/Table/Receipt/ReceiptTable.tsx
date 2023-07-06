import { useEffect, useState, ChangeEvent } from 'react'
import { Button, Input, Spin, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import OrderModal from '../../Modal/OrderModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag, isClickValidToOpenDetail } from '../../../helper/checkEventClick';
import IReceipt from '../../../interface/Receipt';
import { fetchPaidReceipt, fetchUnpaidReceipt, paidReceipt } from '../../../api/admin/receiptAPI';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ReceiptModal from '../../Modal/ReceiptModal';
import { formatNumberWithComma, formatToFullDate } from '../../../helper/utils';
import { combineAndRemoveDuplicates, compareDates, compareNumber, searchDatabyPropertyName } from '../../../helper/tableSorter';
import ErrorAlert from '../../Alert/ErrorAlert';


const ReceiptTable = (props: ReceiptTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IReceipt[]>();
  const [selectedReceipt, setSelectedReceipt] = useState<IReceipt>();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState<IReceipt[]>([]);

  const columns: ColumnsType<IReceipt> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => compareNumber(a.id, b.id),
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
      sorter: (a, b) => compareDates(a.date, b.date),
      render: (text) => <p>{formatToFullDate(text)}</p>,
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => renderPaymentMethodTag(text),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'cost',
      key: 'cost',
      sorter: (a, b) => compareNumber(a.cost, b.cost),
      render: (text) => <p>{formatNumberWithComma(text)}</p>,
    },
    props.state === "unpaid" ? {
      title: 'Thao tác',
      key: 'Action',
      render: (_, record) =>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => handlePaidOnClick(record)}
        >Đã thanh toán</Button>
    } : {}
  ];

  const handlePaidOnClick = (item: IReceipt) => {
    paidReceipt(item.id).then((dataRes) => {
      setData(prev => prev?.filter((data) => data.id !== item.id));
      setSearchData(prev => prev?.filter((data) => data.id !== item.id));
      SuccessAlert("Thanh toán thành công");
    })
  }

  useEffect(() => {
    if (props.state === 'paid')
      fetchPaidReceipt().then(data => { setData(data.data); setSearchData(data.data); }).finally(() => setLoading(false));
    else
      fetchUnpaidReceipt().then(data => { setData(data.data); setSearchData(data.data); }).finally(() => setLoading(false));
  }, [props.state])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const text = e.target.value;
      setSearchText(text);
      if (text.length > 0)
        data && setSearchData(combineAndRemoveDuplicates(searchDatabyPropertyName(data, text, 'order.firstname'), searchDatabyPropertyName(data, text, 'order.lastname')))
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

        <ReceiptModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedReceipt={selectedReceipt} />
        <Input.Search value={searchText} size="middle" placeholder="Nhập tên khách hàng" enterButton style={{ width: '20%', marginBottom: 10 }} onChange={onChange} />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={searchData}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if(isClickValidToOpenDetail(event)) {
                  console.log(record)
                  setSelectedReceipt(record)
                  setIsModalOpen(prev => !prev)
                }
              }, // click row
            };
          }}
        />
      </Spin>
    </>
  )
}

function renderPaymentMethodTag(type: string) {
  switch (type) {
    case 'cod':
      return <Tag>Thanh toán khi nhận hàng</Tag>
    case 'bank':
      return <Tag>Chuyển khoản ngân hàng</Tag>
    default:
      return;
  }
}

interface ReceiptTableProps {
  state: string
}

export default ReceiptTable
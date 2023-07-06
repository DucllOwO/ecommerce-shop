import React, { FC, useState } from 'react'
import { Table } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import CustomerModal from '../Modal/CustomerModal';
import dayjs from 'dayjs';
import IUser from '../../interface/User';
import { compareNumber } from '../../helper/tableSorter';

interface CustomerManagementTable extends TableProps {
  data?: IUser[],
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: IUser, b: IUser) => compareNumber(a.id, b.id),
  },
  {
    title: 'Họ tên',
    key: 'name',
    render: (_: any, record: IUser) =>
      <p>{`${record.lastname} ${record.firstname}`}</p>
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone_number',
    key: 'phonenumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Đăng nhập gần nhất',
    key: 'logged_date',
    render: (_: any, record: IUser) =>
      <p>{(dayjs(Date.now()).diff(dayjs(record.logged_date), 'hour') <= 24) ? `${(dayjs(Date.now()).diff(dayjs(record.logged_date), 'hour'))} giờ trước` : `${(dayjs(Date.now()).diff(dayjs(record.logged_date), 'days'))} ngày trước`}</p>
  },
];



const CustomerManagementTable: FC<CustomerManagementTable> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<IUser>();

  return (
    <>
      <CustomerModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={selectedItem} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record: IUser, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event)) {
                setIsModalOpen(prev => !prev)
                setSelectedItem(record)
              }
            }, // click row
          };
        }}
      />
    </>
  )
}

export default CustomerManagementTable
import React, { FC, useState } from 'react'
import { Table } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import CustomerModal from '../Modal/CustomerModal';

export interface CustomerType {
  id: string;
  email: string;
  address: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  logged_date: string;
  product_viewed?: string[];
}

interface CustomerManagementTable extends TableProps {
  data: CustomerType[],
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Họ tên',
    key: 'name',
    render: (_: any, record: CustomerType) =>
      <p>{`${record.firstName} ${record.lastName}`}</p>
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
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
    dataIndex: 'logged_date',
  },
];



const CustomerManagementTable: FC<CustomerManagementTable> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <CustomerModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event))
                setIsModalOpen(prev => !prev)
            }, // click row
          };
        }}
      />
    </>
  )
}

export default CustomerManagementTable
import React, { FC, useState } from 'react'
import { Table } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { IImporting } from '../../interface/Importing';
import { formatNumberWithComma, formatToFullDate } from '../../helper/utils';
import { compareDates, compareNumber } from '../../helper/tableSorter';

interface ImportingTableProps extends TableProps {
  data: IImporting[],
  setIsModalOpen: Function,
  setSelectedItem: Function
}

const ImportingListTable: FC<ImportingTableProps> = ({ data, setIsModalOpen, setSelectedItem }) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: IImporting, b: IImporting) => compareDates(a.date, b.date),
      render: (_: any, record: IImporting) => (<p>{formatToFullDate(record.date)}</p>)
    },
    {
      title: 'Tổng số lượng nhập',
      dataIndex: 'total_amount',
      key: 'total_amount',
      sorter: (a: IImporting, b: IImporting) => compareNumber(a.total_amount, b.total_amount),
      render: (text: number) => <p>{formatNumberWithComma(text)}</p>
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_cost',
      key: 'total_cost',
      sorter: (a: IImporting, b: IImporting) => compareNumber(a.total_cost, b.total_cost),
      render: (text: number) => <p>{formatNumberWithComma(text)}</p>
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              setIsModalOpen((prev: boolean) => !prev)
              setSelectedItem(record);
            }, // click row
          };
        }}
      />
    </>
  )
}

export default ImportingListTable
import React, { FC, useState } from 'react'
import { Table } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { IImporting } from '../../interface/Importing';
import dayjs from 'dayjs'

// export interface ImportingType {
//   id: string;
//   date: string;
//   total_price: number;
//   total_amount: number;
// }

interface ImportingTableProps extends TableProps {
  data: IImporting[],
  setIsModalOpen: Function,
  setIsReadOnly: Function
}

const ImportingListTable: FC<ImportingTableProps> = ({ data, setIsModalOpen, setIsReadOnly }) => {
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: IImporting) => record.id.toString() === editingKey;

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
      render: (_: any, record: IImporting) => (<p>{dayjs(record.date).format('HH:mm:ss DD/MM/YYYY')}</p>)
    },
    {
      title: 'Tổng số lượng nhập',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_cost',
      key: 'total_cost',
    },
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: IImporting) => ({
        record,
        inputType: col.dataIndex === 'discount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        columns={mergedColumns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event)){
                setIsModalOpen((prev: boolean) => !prev)
                setIsReadOnly(true);
              }  
            }, // click row
          };
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
      />
    </>
  )
}

export default ImportingListTable
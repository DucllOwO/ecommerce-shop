import React, { FC, useState } from 'react'
import { Table } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';

export interface ImportingType {
  id: string;
  date: string;
  total_price: number;
  total_amount: number;
}

interface ImportingTableProps extends TableProps {
  data: ImportingType[],
  setIsModalOpen: Function,
}

const ImportingTable: FC<ImportingTableProps> = ({ data, setIsModalOpen }) => {
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: ImportingType) => record.id === editingKey;

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
    },
    {
      title: 'Tổng số lượng nhập',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
    },
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: ImportingType) => ({
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
              if (isClickOnATableCell(event))
                setIsModalOpen((prev: boolean) => !prev)
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

export default ImportingTable
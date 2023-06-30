import React, { FC, useState } from 'react'
import { Space, Table, Typography, Image, Button } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { IImporting } from '../../interface/Importing';
import dayjs from 'dayjs'
import IProduct from '../../interface/Product';
import { EditFilled } from '@ant-design/icons';
import IProduct_item from '../../interface/ProductItem';

// export interface ImportingType {
//   id: string;
//   date: string;
//   total_price: number;
//   total_amount: number;
// }

interface ImportingTableProps extends TableProps {
  data: IImporting[],
  setIsModalOpen: Function,
  setIsReadOnly: Function,
  setSelectedItem: Function
}

const ImportingTable: FC<ImportingTableProps> = ({ data, setIsModalOpen, setIsReadOnly, setSelectedItem }) => {
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: IImporting) => record.id.toString() === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      key: 'name_image',
      render: (text: string, record: IProduct) => <Space direction='horizontal'>
        <Image width={100} height={150} alt="example" src={record?.image[0]} />
        <Typography.Text>{record.name}</Typography.Text>
      </Space>,
    },
    {
      title: 'Gía',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'Bán',
      dataIndex: 'sold',
      key: 'sold',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '10%',
      render: (_: any, record: IImporting) => <Space>
        <Button
          onClick={() => {
            setSelectedItem(record)
            setIsModalOpen(true)}
          }>Nhập hàng</Button>
      </Space>,
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
                // setIsModalOpen((prev: boolean) => !prev)
                setIsReadOnly(true);
                setSelectedItem(record);
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

export default ImportingTable
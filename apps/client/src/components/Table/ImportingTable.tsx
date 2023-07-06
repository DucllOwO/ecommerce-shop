import React, { FC, useState } from 'react'
import { Space, Table, Typography, Image, Button } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell, isClickValidToOpenDetail } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { IImporting } from '../../interface/Importing';
import IProduct from '../../interface/Product';
import { formatNumberWithComma } from '../../helper/utils';

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
        <Image className='imgborder' width={100} height={120} alt="example" src={record?.image[0]} />
        <Typography.Text>{record.name}</Typography.Text>
      </Space>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>,
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>,
    },
    {
      title: 'Bán',
      dataIndex: 'sold',
      key: 'sold',
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '10%',
      render: (_: any, record: IImporting) => <Space>
        <Button
          onClick={() => {
            setSelectedItem(record)
            setIsModalOpen(true)
          }
          }>Nhập hàng</Button>
      </Space>,
    },
  ];
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: IImporting) => ({
        ...record,
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
              if (isClickValidToOpenDetail(event)) {
                // setIsModalOpen((prev: boolean) => !prev)
                setIsReadOnly((prev: boolean) => !prev);
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
import React, { FC, useState } from 'react'
import { Space, Table, Typography, Image, Button } from 'antd';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell, isClickValidToOpenDetail } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { IImporting } from '../../interface/Importing';
import IProduct from '../../interface/Product';
import { formatNumberWithComma } from '../../helper/utils';
import { ColumnsType } from 'antd/es/table';
import { IImportDetail } from '../../interface/ImportDetail';

interface ImportingDetailTableProps extends TableProps {
  data: IImportDetail[],
}

const ImportingDetailTable: FC<ImportingDetailTableProps> = ({ data }) => {

  const columns: ColumnsType<IImportDetail> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      key: 'name_image',
      render: (text: string, record: IImportDetail) => <Space direction='horizontal'>
        <Image className='imgborder' width={100} height={120} alt="example" src={record.Product_item.product.image[0]} />
        <Typography.Text>{record.Product_item.product.name}</Typography.Text>
      </Space>,
    },
    {
      title: 'Phân loại',
      key: 'size-color',
      render: (text: string, record: IImportDetail) => <p>{record.Product_item.size + "/" + record.Product_item.color}</p>,
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price',
      key: 'price',
      render: (text: number, record: IImportDetail) => <p>{formatNumberWithComma(text)}</p>,
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'quantity',
      key: 'view',
      render: (text: number, record: IImportDetail) => <p>{formatNumberWithComma(text)}</p>,
    },
    {
      title: 'Tổng giá bán',
      dataIndex: 'total_cost',
      key: 'sold',
      render: (text: number, record: IImportDetail) => <p>{formatNumberWithComma(record.total_cost)}</p>,
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default ImportingDetailTable
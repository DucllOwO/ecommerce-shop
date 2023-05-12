import React, { FC, useState } from 'react'

import { Button, Image, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import ProductModal from '../../Modal/ProductModal';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { isClickOnAnImgTag, isClickOnAnSVGTag, isClickOnATableCell } from '../../../helper/checkEventClick';
import { TableProps } from '../../../interface/TableProps';
export interface ProductType {
  id: string;
  name: string;
  description: string;
  image: string;
  view: number;
  sold: number;
}

interface ProductTableProps extends TableProps {
  data: ProductType[],
  setIsEditing: Function,
  setIsModalOpen: Function
}

const ProductTable: FC<ProductTableProps> = ({ data, setData, setIsEditing, setIsModalOpen }) => {

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      key: 'name_image',
      render: (text: string, record: ProductType) => <Space direction='horizontal'>
        <Image width={100} height={150} alt="example" src={record.image} />
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
      render: (_: any, record: ProductType) => <Space>
        <Button shape="circle" icon={<EditFilled />} onClick={() => {
          setIsEditing((prev: boolean) => !prev);
          setIsModalOpen((prev: boolean) => !prev)
        }} />
        <Button shape="circle" icon={<DeleteFilled />} />
      </Space>,
    },
  ];

  return (
    <>

      <Table columns={columns} dataSource={data} onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (isClickOnATableCell(event))
              setIsModalOpen((prev: boolean) => !prev)
          },
        };
      }} />
    </>
  )
}

export default ProductTable
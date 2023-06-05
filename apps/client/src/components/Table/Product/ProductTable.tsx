import React, { FC, useState } from 'react'

import { Button, Image, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import ProductModal from '../../Modal/ProductModal';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { isClickOnAnImgTag, isClickOnAnSVGTag, isClickOnATableCell } from '../../../helper/checkEventClick';
import { TableProps } from '../../../interface/TableProps';
import IProduct from '../../../interface/Product';
import { ACTION_EDIT, ACTION_READ, SET_ACTION } from '../../../constant/constant';
// export interface ProductType {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   view: number;
//   sold: number;
// }

interface ProductTableProps extends TableProps {
  data?: IProduct[],
  setSelectedItem: Function,
  dispatch: Function,
  setIsModalOpen: Function
}

const ProductTable: FC<ProductTableProps> = ({ data, setSelectedItem, dispatch, setIsModalOpen }) => {

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
      render: (_: any, record: IProduct) => <Space>
        <Button shape="circle" icon={<EditFilled />} onClick={() => {
          dispatch({ type: SET_ACTION, payload: ACTION_EDIT})
          setIsModalOpen((prev: boolean) => !prev);
          setSelectedItem(record);
        }} />
        {/* <Button shape="circle" icon={<DeleteFilled />} /> */}
      </Space>,
    },
  ];

  return (
    <>

      <Table columns={columns} dataSource={data} onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (isClickOnATableCell(event)) {
              dispatch({ type: SET_ACTION, payload: ACTION_READ})
              setIsModalOpen((prev: boolean) => !prev)
              setSelectedItem(record)
            }
          },
        };
      }} />
    </>
  )
}

export default ProductTable
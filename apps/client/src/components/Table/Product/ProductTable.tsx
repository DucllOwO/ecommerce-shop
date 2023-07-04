import React, { FC, useEffect, useState } from 'react'

import { Button, Image, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import ProductModal from '../../Modal/ProductModal';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { isClickOnAnImgTag, isClickOnAnSVGTag, isClickOnATableCell, isClickValidToOpenDetail } from '../../../helper/checkEventClick';
import { TableProps } from '../../../interface/TableProps';
import IProduct from '../../../interface/Product';
import { ACTION_EDIT, ACTION_READ, SET_ACTION } from '../../../constant/constant';
import { formatNumberWithComma } from '../../../helper/utils';
import { compareNumber } from '../../../helper/tableSorter';

interface ProductTableProps extends TableProps {
  data?: IProduct[],
  setSelectedItem: Function,
  dispatch: Function,
  setIsModalOpen: Function
}

const ProductTable: FC<ProductTableProps> = ({ data, setSelectedItem, dispatch, setIsModalOpen }) => {

  const columns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => compareNumber(a.id, b.id),
    },
    {
      title: 'Sản phẩm',
      key: 'name_image',
      width: '50%',
      render: (text: string, record: IProduct) => <Space direction='horizontal'>
        <Image className='imgborder' width={100} height={130} alt="example" src={record?.image[0]} />
        <Typography.Text>{record.name}</Typography.Text>
      </Space>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => compareNumber(a.price, b.price),
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
      sorter: (a, b) => compareNumber(a.view, b.view),
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>
    },
    {
      title: 'Bán',
      dataIndex: 'sold',
      key: 'sold',
      sorter: (a, b) => compareNumber(a.sold, b.sold),
      render: (text: number, record: IProduct) => <p>{formatNumberWithComma(text)}</p>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '10%',
      render: (_: any, record: IProduct) => <Space>
        <Button shape="circle" icon={<EditFilled />} onClick={() => {
          dispatch({ type: SET_ACTION, payload: ACTION_EDIT })
          setIsModalOpen((prev: boolean) => !prev);
          setSelectedItem(record);
        }} />
      </Space>,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (isClickValidToOpenDetail(event)) {
              dispatch({ type: SET_ACTION, payload: ACTION_READ })
              setIsModalOpen((prev: boolean) => !prev);
              setSelectedItem(record)
            }
          },
        };
      }} />
    </>
  )
}

export default ProductTable
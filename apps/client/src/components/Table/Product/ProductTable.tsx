import React, { useState } from 'react'

import { Button, Image, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../../constant/styles';
import ProductModal from '../../Modal/ProductModal';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';

interface DataType {
  id: string;
  name: string;
  description: string;
  image: string;
  view: number;
  sold: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Sản phẩm',
    key: 'name_image',
    render: (text, record) => <Space direction='horizontal'>
      <Image width={100} height={150} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      <Typography.Text>{record.name}</Typography.Text>
    </Space>,
  },
  {
    title: 'Gía',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <p>{text}</p>,

  },
  {
    title: 'Lượt xem',
    dataIndex: 'view',
    key: 'view',
    render: (text) => <p>{text}</p>,

  },
  {
    title: 'Bán',
    dataIndex: 'sold',
    key: 'sold',
    render: (text) => <p>{text}</p>,

  },
  {
    title: 'Thao tác',
    key: 'action',
    width: '10%',
    render: (text) => <Space>
      <Button shape="circle" icon={<EditFilled />} />
      <Button shape="circle" icon={<DeleteFilled />} />
    </Space>,
  },
];

const data = [{
  id: 'string',
  name: 'number',
  description: 'string',
  image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  price: 100000000,
  view: 1000,
  sold: 9999,
}]

const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <ProductModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isEdit={true} />
      <Table columns={columns} dataSource={data} onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (!(isClickOnAnSVGTag(event) || isClickOnAnImgTag(event)))
              setIsModalOpen(prev => !prev)
          }, // click row
        };
      }} />
    </>
  )
}

export default ProductTable
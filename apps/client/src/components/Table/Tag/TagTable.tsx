import React, { useState } from 'react'
import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TagModal from '../../Modal/TagModal';
import { isClickOnAnImgTag, isClickOnAnSVGTag } from '../../../helper/checkEventClick';
import {
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';

interface DataType {
  id: string;
  name: string;
  discount: number;
}

const data: DataType[] = [
  {
    id: '1',
    name: 'shirt',
    discount: 10,
  }
]

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Tên nhãn',
    key: 'name',
    dataIndex: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Giảm giá',
    key: 'discount',
    dataIndex: 'discount',
    render: (text) => <Typography.Text>{text}</Typography.Text>
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: "10%",
    render: (_) => {
      return <Space>
        <Button shape="circle" icon={<EditFilled />} />
        <Button shape="circle" icon={<DeleteFilled />} />
      </Space>
    }
  },
];

const TagTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <TagModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (!isClickOnAnSVGTag(event))
                setIsModalOpen(prev => !prev)
            }, // click row
          };
        }}
      />
    </>
  )
}

export default TagTable
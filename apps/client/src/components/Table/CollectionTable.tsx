import React, { useState } from 'react'

import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TABLE_HEIGHT } from '../../constant/styles';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import CollectionModal from '../Modal/CollectionModal';
import { isClickOnAnSVGTag } from '../../helper/checkEventClick';

interface DataType {
  id: string;
  name: string;
  discount: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '15%',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Tên',
    key: 'name',
    dataIndex: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: "10%",
    render: (text) => (<Space>
      <Button shape="circle" icon={<EditFilled />} />
      <Button shape="circle" icon={<DeleteFilled />} />
    </Space>)
  },
];

const data = [
  {
    id: '1',
    name: 'Thu dong',
    discount: 10,
  }
]

const CollectionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <CollectionModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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

export default CollectionTable
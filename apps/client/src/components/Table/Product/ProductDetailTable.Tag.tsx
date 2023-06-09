import React, { useEffect, useState } from 'react'
import { Card, Table, Image, Space, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { fetchTag } from '../../../api/admin/tagAPI';
import ITag from '../../../interface/Tag';
import { IHaveTag } from '../../../interface/HaveTag';

const { Text } = Typography;


interface DataType {
  key?: string;
  id: number;
  name: string;
  image: string;
  tag: string[];
}

const columns: ColumnsType<IHaveTag> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Sản phẩm',
    key: 'name_image',
    render: (text, record) => {
      return <Space direction='horizontal'>
        <Image width={100} height={150} alt="example" src={record.product.image[0]} />
        <Text>{record.product.name}</Text>
      </Space>
    },
  },
  // {
  //   title: 'Nhãn',
  //   dataIndex: 'tag',
  //   key: 'tag',
  //   render: (_, { tag }) => {
  //     return <Space direction='horizontal' wrap>
  //       {tag?.map((value) => {
  //         return <Tag>{value}</Tag>
  //       })}
  //     </Space>
  //   },
  // },
];

const ProductTagDetailTable = (props: TagDetailProps) => {

  const [data, setData] = useState<ITag[]>();

  useEffect(() => {
    if (props.selectedTag)
      fetchTag(props.selectedTag.id).then((data) => {
        console.log(data.data)
        setData(data.data.HaveTag);
      })
  }, [props])

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  )
}

type TagDetailProps = {
  selectedTag?: ITag
}

export default ProductTagDetailTable
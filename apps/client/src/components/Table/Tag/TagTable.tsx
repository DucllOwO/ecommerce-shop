import React, { FC, useState } from 'react'
import { Button, Space, Table, Typography, Form, InputNumber, Input, Popconfirm } from 'antd';
import TagModal from '../../Modal/TagModal';
import { isClickOnATableCell } from '../../../helper/checkEventClick';
import {
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';
import { TableProps } from '../../../interface/TableProps';
import EditableCell from '../EditableCell';
import { INPUT, SELECT } from '../../../constant/constant';
import { ITag } from '../../../interface/Tag';

// export interface TagType {
//   id: string;
//   name: string;
//   discount: number;
// }

interface TagTableProps extends TableProps {
  data?: ITag[],
}

const TagTable: FC<TagTableProps> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const [selectedTag, setSelectedTag] = useState<ITag>();

  const isEditing = (record: ITag) => record.id.toString() === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên nhãn',
      key: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Giảm giá',
      key: 'discount',
      dataIndex: 'discount',
      editable: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: ITag) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => save(record.id.toString())} style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <Popconfirm title="Thông tin sẽ không được lưu bạn có chắc chắn muốn hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </> :
            <>
              <Button
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                shape="circle" icon={<EditFilled />} />
              <Button disabled={editingKey !== ''} shape="circle" icon={<DeleteFilled />} />
            </>
          }

        </Space>
      }
    },
  ];

  const edit = (record: Partial<ITag>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id?.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const row = (await form?.validateFields()) as ITag;

      const newData = data ? [...data] : [];
      const index = newData.findIndex((item) => id === item.id.toString());
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData && setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData && setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ITag) => ({
        record,
        inputType: getType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <>
      <TagModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedTag={selectedTag} />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        onRow={(record : ITag, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event))
                setIsModalOpen(prev => !prev)
              setSelectedTag(record)
            }, // click row
          };
        }}

      />
    </>
  )
}

function getType(dataIndex: string) {
  switch (dataIndex) {
    case 'discount':
      return SELECT;
    default:
      return INPUT;
  }
}

export default TagTable
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

export interface TagType {
  id: string;
  name: string;
  discount: number;
}

interface TagTableProps extends TableProps {
  data: TagType[],
}

const TagTable: FC<TagTableProps> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: TagType) => record.id === editingKey;

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
      render: (_: any, record: TagType) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
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

  const edit = (record: Partial<TagType>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const row = (await form?.validateFields()) as TagType;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
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
      onCell: (record: TagType) => ({
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
      <TagModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event))
                setIsModalOpen(prev => !prev)
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
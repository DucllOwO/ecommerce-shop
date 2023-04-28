import React, { FC, useState } from 'react'
import { Button, Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import CollectionModal from '../Modal/CollectionModal';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import { TableProps } from '../../interface/TableProps';
import EditableCell from './EditableCell';
import { INPUT, SELECT } from '../../constant/constant';

export interface CollectionType {
  id: string;
  name: string;
  discount: number;
}

interface CollectionTableProps extends TableProps {
  data: CollectionType[],
}

const CollectionTable: FC<CollectionTableProps> = ({ data, form, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: CollectionType) => record.id === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: CollectionType) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn có chắc muốn hủy bỏ chỉnh sửa?" onConfirm={cancel}>
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

  const edit = (record: Partial<CollectionType>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const row = (await form?.validateFields()) as CollectionType;

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
      onCell: (record: CollectionType) => ({
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
      <CollectionModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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

export default CollectionTable
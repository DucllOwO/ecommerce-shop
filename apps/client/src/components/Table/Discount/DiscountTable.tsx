import React, { FC, useState } from 'react'
import { Table, Space, Button, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import DiscountModal from '../../Modal/DiscountModal';
import { isClickOnAnSVGTag, isClickOnATableCell } from '../../../helper/checkEventClick';
import { TableProps } from '../../../interface/TableProps';
import EditableCell from '../EditableCell';
import Discount from '../../../interface/Discount';

// export interface IDiscount {
//   id: string;
//   name: string;
//   discount: number;
// }

interface DiscountTableProps extends TableProps {
  data?: Discount[],
}

const data = [
  {
    id: '1',
    name: 'Ban e',
    discount: 50
  }
]

const DiscountTable: FC<DiscountTableProps> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: Discount) => record.id.toString() === editingKey;

  const columns = [
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      editable: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: Discount) => {
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

  const edit = (record: Partial<Discount>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id?.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const row = (await form?.validateFields()) as Discount;

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
      onCell: (record: Discount) => ({
        record,
        inputType: col.dataIndex === 'discount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <DiscountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Table
        columns={mergedColumns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event))
                setIsModalOpen(prev => !prev)
            }, // click row
          };
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
      />
    </>
  )
}

export default DiscountTable
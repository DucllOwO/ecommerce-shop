import React, { FC, useState } from 'react'
import { Table, Space, Button, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { DATE, INPUT, INPUT_NUMBER, TEXTAREA } from '../../constant/constant';
import Voucher from '../../interface/Voucher';
import dayjs from 'dayjs';

// export interface VoucherType {
//   code: string;
//   name: string;
//   description: string,
//   due: string,
//   discount: number;
// }

interface VoucherTableProps extends TableProps {
  data?: Voucher[],
}

const VoucherTable: FC<VoucherTableProps> = ({ form, data, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const isEditing = (record: Voucher) => record.code === editingKey;

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
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
      render: (_: any, record: Voucher) => {
        return <p>{`${record.discount*100}%`}</p>
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'due',
      key: 'due',
      editable: true,
      render: (_: any, record: Voucher) => {
        return <p>{dayjs(record?.due).format("DD/MM/YYYY")}</p>
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: Voucher) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => save(record.code)} style={{ marginRight: 8 }}>
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

  const edit = (record: Partial<Voucher>) => {
    form?.setFieldsValue({ name: '', discount: '', due: '', description: '', ...record });
    setEditingKey(record.code);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: string) => {
    try {
      const row = (await form?.validateFields()) as Voucher;

      const newData = data ? [...data] : [];
      const index = newData.findIndex((item) => id === item.code);
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
      onCell: (record: Voucher) => ({
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

function getType(dataIndex: string) {
  switch (dataIndex) {
    case 'due':
      return DATE;
    case 'description':
      return TEXTAREA;
    case 'discount':
      return INPUT_NUMBER;
    default:
      return INPUT;
  }
}

export default VoucherTable
import React, { FC, useState } from 'react'
import { Table, Space, Button, Typography, Popconfirm, Form, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { TableProps } from '../../interface/TableProps';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import EditableCell from './EditableCell';
import { DATE, INPUT, INPUT_NUMBER, TEXTAREA } from '../../constant/constant';
import IVoucher from '../../interface/Voucher';
import dayjs from 'dayjs';
import { shutDownVoucher, updateVoucher } from '../../api/admin/VoucherAPI';
import SuccessAlert from '../Alert/SuccessAlert';
import { REQUIRED_RULE, STRING_LENGTH_RULE } from '../../constant/formRules';
import { compareDates, compareNumber } from '../../helper/tableSorter';

interface VoucherTableProps extends TableProps {
  data?: IVoucher[],
}

const VoucherTable: FC<VoucherTableProps> = ({ data, setData }) => {
  const [editForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = (record: IVoucher) => record.code === editingKey;

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      rules: [REQUIRED_RULE, STRING_LENGTH_RULE(6)]
    },
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      rules: [REQUIRED_RULE]
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      editable: true,
      rules: [REQUIRED_RULE],
      sorter: (a: IVoucher, b: IVoucher) => compareNumber(a.discount, b.discount),
      render: (_: any, record: IVoucher) => {
        return <p>{`${record.discount}%`}</p>
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'due_to',
      key: 'due-to',
      editable: true,
      rules: [REQUIRED_RULE],
      sorter: (a: IVoucher, b: IVoucher) => compareDates(a.due, b.due),
      render: (_: any, record: IVoucher) => {
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
      render: (_: any, record: IVoucher) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => editForm.submit()} style={{ marginRight: 8 }}>
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
              <Button disabled={editingKey !== ''} shape="circle" icon={<DeleteFilled />} onClick={() => deleteVoucher(record.code)} />
            </>
          }

        </Space>
      }
    },
  ];

  const deleteVoucher = (code: string) => {
    setIsLoading(true)
    shutDownVoucher(code).then(({ data }) => {
      // setData && setData((prev: IVoucher[]) => prev.filter((value) => value.code != code))
      SuccessAlert(`Voucher mã khuyến mãi ${code} đã bị ngưng hoạt động`);
    }).catch((err) => err).finally(() => setIsLoading(false))
  }

  const edit = (record: Partial<IVoucher>) => {
    editForm?.setFieldsValue({ name: '', discount: '', due: '', description: '', ...record });
    setEditingKey(record.code ? record.code : '');
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (values: any) => {
    updateVoucher({ ...values, code: editingKey, due: values.due_to }).then(({ data: dataRes }) => {
      const newData = data ? [...data] : [];
      const index = newData.findIndex((item) => editingKey == item.code);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...values,
        });
        setEditingKey('');
      } else {
        newData.push(values);
        setEditingKey('');
      }
      setData && setData(newData)
      SuccessAlert('Cập nhật thành công');
    }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IVoucher) => ({
        record: { ...record, due: dayjs(record.due) },
        inputType: getType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        rules: col.rules
      })
    };
  });

  return (
    <>
      <Spin spinning={isLoading}>
        <Form form={editForm} onFinish={save}>
          <Table
            rowKey={record => record.code}
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
        </Form>
      </Spin>
    </>
  )
}

function getType(dataIndex: string) {
  switch (dataIndex) {
    case 'due_to':
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
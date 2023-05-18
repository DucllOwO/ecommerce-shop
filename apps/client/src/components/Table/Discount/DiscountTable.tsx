import React, { FC, useState } from 'react'
import { Table, Space, Button, Typography, Popconfirm, Form, Spin, DatePicker } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import DiscountModal from '../../Modal/DiscountModal';
import { isClickOnATableCell } from '../../../helper/checkEventClick';
import { TableProps } from '../../../interface/TableProps';
import EditableCell from '../EditableCell';
import IDiscount from '../../../interface/Discount';
import { deleteDiscount, updateDiscount } from '../../../api/admin/DiscountAPI';
import SuccessAlert from '../../Alert/SuccessAlert';

interface DiscountTableProps extends TableProps {
  data?: IDiscount[],
}

const DiscountTable: FC<DiscountTableProps> = ({ data, setData }) => {


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState<string | undefined>('');
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = (record: IDiscount) => record.id.toString() === editingKey;

  async function confirmDelete(id: number) {
    deleteDiscount(id).then(({ data }) => {
      setData && setData((prev: IDiscount[]) => prev.filter((value) => value.id != id))
      SuccessAlert('Xoá khuyến mãi thành công.')
    }).catch((err) => console.log(err))
  };

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
      title: 'Giảm giá (%)',
      dataIndex: 'discount',
      key: 'discount',
      editable: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: IDiscount) => {
        const editable = isEditing(record);
        return <Space>
          {editable ? <>
            <Typography.Link onClick={() => form.submit()} style={{ marginRight: 8 }}>
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
              <Popconfirm
                title="Xoá chương trình khuyến mãi?"
                description="Bạn có chắc chắn muốn xoá, khi xoá sẽ không thể phục hồi?"
                onConfirm={() => confirmDelete(record.id)}
                okText="Xoá"
                cancelText="Không"
              >
                <Button disabled={editingKey !== ''} shape="circle" icon={<DeleteFilled />} />
              </Popconfirm>
            </>
          }
        </Space>
      }
    },
  ];

  const edit = (record: Partial<IDiscount>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id?.toString());
  };

  const save = async (values: IDiscount) => {
    setIsLoading(true)
    updateDiscount({ ...values, id: Number(editingKey) }).then(({ data }) => {
      setData && setData((prev: IDiscount[]) => {
        const newData = prev ? [...prev] : [];
        const index = newData.findIndex((item) => Number(editingKey) == item.id);
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
        return newData
      })
    }).catch((err) => console.log(err)).finally(() => setIsLoading(false))
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IDiscount) => ({
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
      <Spin spinning={isLoading}>
        <DiscountModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Form form={form} onFinish={save}>
          <Table
            rowKey={record => record.id}
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

  function cancel() {
    setEditingKey('');
  };
}

export default DiscountTable
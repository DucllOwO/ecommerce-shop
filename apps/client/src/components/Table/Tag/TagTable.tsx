import React, { FC, useState } from 'react'
import { Button, Space, Table, Typography, Popconfirm, Select, Form } from 'antd';
import TagModal from '../../Modal/TagModal';
import { isClickOnATableCell } from '../../../helper/checkEventClick';
import {
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';
import { TableProps } from '../../../interface/TableProps';
import EditableCell from '../EditableCell';
import { INPUT, SELECT } from '../../../constant/constant';
import ITag from '../../../interface/Tag';
import { deleteTag, updateTag } from '../../../api/admin/tagAPI';
import SuccessAlert from '../../Alert/SuccessAlert';
import IDiscount from '../../../interface/Discount';
import { compareNumber } from '../../../helper/tableSorter';
import { ColumnsType, ColumnType } from 'antd/es/table';

interface TagTableProps extends TableProps {
  data?: ITag[],
  discounts?: IDiscount[]
}

const TagTable: FC<TagTableProps> = ({ form, data, setData, discounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const [selectedTag, setSelectedTag] = useState<ITag>();

  const [isLoading, setIsLoading] = useState(false);

  const isEditing = (record: ITag) => record.id.toString() === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a: ITag, b: ITag) => compareNumber(a.id, b.id),
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
      width: "30%",
      render: (_: any, record: ITag) => {
        const editing = isEditing(record);
        if (editing)
          return <Form.Item name={'discountID'} style={{ marginBottom: 0 }}>
            <Select allowClear style={{ width: '100%' }} options={discounts} placeholder="Chọn mã giảm giá áp dụng cho nhãn" />
          </Form.Item>
        else
          return record.discount ? <p>{`${record.discount?.name} - ${record.discount?.discount}%`}</p> : 'Không áp dụng khuyến mãi'
      }
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: "10%",
      render: (_: any, record: ITag) => {
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
              <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDeleteTag(record)}>
                <Button disabled={editingKey !== ''} shape="circle" icon={<DeleteFilled />} />
              </Popconfirm>
            </>
          }
        </Space>
      }
    },
  ];

  const onDeleteTag = (tag: ITag) => {
    deleteTag(tag).then((res) => {
      setData && setData((prev: ITag[]) => prev.filter((ele) => ele.id !== tag.id))
      SuccessAlert('Xóa sản phẩm thành công.')
    })
  }

  const edit = (record: Partial<ITag>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id?.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    const tag = form?.getFieldsValue();
    setIsLoading(true)
    console.log(tag)
    updateTag({ ...tag, id: id }).then(({ data: dataRes }) => {
      const newData = data ? [...data] : [];
      const index = newData.findIndex((item) => id == item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...dataRes,
        });
        setEditingKey('');
      } else {
        newData.push(dataRes);
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
        rowKey={record => record.id}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        onRow={(record: ITag, rowIndex) => {
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
import React, { FC, useState } from 'react'
import { Button, Form, Popconfirm, Select, Space, Table, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import CollectionModal from '../Modal/CollectionModal';
import { isClickOnATableCell } from '../../helper/checkEventClick';
import { TableProps } from '../../interface/TableProps';
import EditableCell from './EditableCell';
import { INPUT, SELECT } from '../../constant/constant';
import ICollection from '../../interface/Collection';
import IDiscount from '../../interface/Discount';
import { deleteCollection, updateCollection } from '../../api/admin/collectionAPI';
import SuccessAlert from '../Alert/SuccessAlert';
import { compareNumber } from '../../helper/tableSorter';

interface CollectionTableProps extends TableProps {
  data?: ICollection[],
  discounts?: IDiscount[]
}

const CollectionTable: FC<CollectionTableProps> = ({ data, form, setData, discounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingKey, setEditingKey] = useState<string | undefined>('');

  const [selectedItem, setSelectedItem] = useState<ICollection>();

  const [isLoading, setIsLoading] = useState(false);

  const isEditing = (record: ICollection) => record.id.toString() === editingKey;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      sorter: (a: ICollection, b: ICollection) => compareNumber(a.id, b.id),
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Giảm giá',
      key: 'discount',
      dataIndex: 'discount',
      width: "30%",
      sorter: (a: ICollection, b: ICollection) => {
        if (!a.discount?.discount)
          return compareNumber(0, b?.discount?.discount)
        if (!b?.discount?.discount)
          return compareNumber(a.discount?.discount, 0)

        return compareNumber(a.discount?.discount, b?.discount?.discount)
      },
      render: (_: any, record: ICollection) => {
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
      render: (_: any, record: ICollection) => {
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
              <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => onDeleteCollection(record)}>
                <Button disabled={editingKey !== ''} shape="circle" icon={<DeleteFilled />} />
              </Popconfirm>
            </>
          }

        </Space>
      }
    },
  ];

  const onDeleteCollection = (collection: ICollection) => {
    deleteCollection(collection).then((res) => {
      setData && setData((prev: ICollection[]) => prev.filter((ele) => ele.id !== collection.id))
      SuccessAlert('Xóa sản phẩm thành công.')
    })
  }

  const edit = (record: Partial<ICollection>) => {
    form?.setFieldsValue({ name: '', discount: '', ...record });
    setEditingKey(record.id?.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    const collection = form?.getFieldsValue();
    setIsLoading(true)
    console.log(collection)
    updateCollection({ ...collection, id: id }).then(({ data: dataRes }) => {
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
      onCell: (record: ICollection) => ({
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
      <CollectionModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedItem={selectedItem} />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        onRow={(record: ICollection, rowIndex) => {
          return {
            onClick: (event: React.MouseEvent) => {
              if (isClickOnATableCell(event)) {
                setIsModalOpen(prev => !prev)
                setSelectedItem(record)
              }
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
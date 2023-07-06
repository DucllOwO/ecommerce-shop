import { Form, Space, Descriptions, Select, Input, InputNumber, Switch, Upload, Divider, UploadFile, UploadProps, Modal } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import React, { FC, useEffect, useState } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { FORM_NO_BOTTOM_MARGIN } from '../../constant/styles'
import ProductInventoryCreateForm from './ProductInventoryCreateForm'
import ProductFormProps from '../../interface/ProductFormProps'
import IProduct from '../../interface/Product'
import { deleteImage, updateProduct } from '../../api/admin/productAPI'

interface ProductEditFormProps extends ProductFormProps {
  selectedItem: IProduct,
  setImageList: React.SetStateAction<any>
}

const ProductEditForm: FC<ProductEditFormProps> = ({ form, collectionInit, discountInit, tagInit, selectedItem, setImageList }) => {
  const [fileList, setFileList] = useState<UploadFile[]>(selectedItem.image.map((item, index) => {
    return {
      uid: `${index}`,
      name: item.split('/')[8],
      status: 'done',
      url: item,
    }
  }));

  useEffect(() => {
    setImageList(fileList);
  }, [])
  const [isOpen, setIsModalOpen] = useState(false);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log(fileList);
    setImageList(newFileList);
    setFileList(newFileList);
  };
  // useEffect(() => {
  //   // form.setFieldValue('upload', selectedItem.image.map((item, index) => {
  //   //   return {
  //   //     uid: index,
  //   //     name: item.split('/')[8],
  //   //     status: 'done',
  //   //     url: item,
  //   //   }
  //   // }));
  //   // setFileList();
  //   console.log(fileList);
  // }, [fileList]);

  const handleOnRemove = async (item: UploadFile) => {
    console.log(item);
    if (item.url) {
      let isDone = false;
      Modal.confirm({
        title: 'Cảnh báo xoá dữ liệu',
        content: 'Bạn có chắc muốn xoá ảnh này?',
        okText: 'Đồng ý',
        cancelText: 'Quay lại',
        onOk: async () => {
          return await deleteImage(item.url?.split("/")[8])
            .then((data) => {
              const newProductImageList = selectedItem.image.filter((image) => image !== item.url)

              updateProduct({ image: newProductImageList }, selectedItem.id);

              setFileList((prev: UploadFile[]) =>
                prev.filter((file) =>
                  file !== item
                ));
              form.setFieldValue('upload', fileList.filter((file) =>
                file !== item
              ))
            })
            .catch((error) => {
              console.log(error)
            });
        }
      });
      return false;
    }
    else if (item.originFileObj) {
      return true;
    }
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form form={form}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Descriptions title="Chỉnh sửa thông tin sản phẩm" bordered>
          <Descriptions.Item label="ID" span={1}>{selectedItem?.id}</Descriptions.Item>
          <Descriptions.Item label="Bộ siêu tập" span={2}>
            <Form.Item name={'collection'} initialValue={selectedItem.collectionID ? { value: selectedItem.collectionID, label: selectedItem?.collection?.name } : null} style={FORM_NO_BOTTOM_MARGIN}>
              <Select
                allowClear
                style={{ width: '100%', color: 'black' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={collectionInit}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={3} style={{ minWidth: 150 }}>
            <Form.Item name={'name'} rules={[REQUIRED_RULE]} initialValue={selectedItem?.name} style={FORM_NO_BOTTOM_MARGIN}>
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Nhãn" span={3}>
            <Form.Item name={'tags'} rules={[REQUIRED_RULE]} initialValue={selectedItem?.HaveTag.map((item) => { return { value: item.tagID, label: item.tag.name } })} style={FORM_NO_BOTTOM_MARGIN}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={tagInit}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Lượt xem" span={1}>
            {selectedItem?.view}
          </Descriptions.Item>
          <Descriptions.Item label="Lượt mua" span={1}>
            {selectedItem?.sold}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={3}>
            <Form.Item name={'collection'} initialValue={selectedItem.isActive ? true : false} style={FORM_NO_BOTTOM_MARGIN}>
              <Switch defaultChecked />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Hỉnh ảnh" span={3}>
            <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              initialValue={fileList}
              style={FORM_NO_BOTTOM_MARGIN}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={file => {
                  return false;
                }}
                onRemove={e => {
                  return handleOnRemove(e);
                }}
                onChange={onChange}
              >
                {fileList.length < 4 && '+ Thêm ảnh'}
              </Upload>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={3}>
            <Form.Item name={'note'} rules={[REQUIRED_RULE]} initialValue={selectedItem.description ? selectedItem.description : ""} style={FORM_NO_BOTTOM_MARGIN}>
              <Input.TextArea style={{ width: '100%', height: 150 }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá (%)" span={3}>
            <Form.Item name={'discount'} style={FORM_NO_BOTTOM_MARGIN}>
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn mã giảm giá áp dụng cho sản phẩm"
                options={discountInit}
                defaultValue={selectedItem.discountID ? { value: selectedItem.discountID, label: `${selectedItem.discount?.name} - ${selectedItem.discount?.discount}%` } : null}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán (đ)" span={1}>
            <Form.Item name={'price'} rules={[REQUIRED_RULE]} initialValue={selectedItem?.price} style={FORM_NO_BOTTOM_MARGIN}>
              <InputNumber
                min={1000}
                controls={false}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        {/* <Divider />
        <ProductInventoryCreateForm form={form} isReadOnly={true} /> */}
      </Space>
    </Form>
  )
}

export default ProductEditForm
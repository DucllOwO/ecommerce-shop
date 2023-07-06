import { Form, Space, Descriptions, Select, Input, InputNumber, Switch, Upload, Divider, UploadFile, UploadProps } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import React, { FC, useState } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { FORM_NO_BOTTOM_MARGIN } from '../../constant/styles'
import ProductInventoryCreateForm from './ProductInventoryCreateForm'
import ProductFormProps from '../../interface/ProductFormProps'

interface ProductCreateProps extends ProductFormProps {
  setImageList: React.SetStateAction<any>
}

const ProductCreateForm: FC<ProductCreateProps> = ({ form, tagInit, collectionInit, discountInit, setImageList }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const [blobList, setBlobList] = useState<Blob[]>();
  // const formData = new FormData();
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // reader.readAsDataURL();
    console.log(newFileList)
    setImageList([...newFileList])
    setFileList(newFileList);
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      console.log(e)
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form form={form}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Descriptions title="Them sản phẩm" bordered>
          <Descriptions.Item label="ID" span={1}>Auto</Descriptions.Item>
          <Descriptions.Item label="Bộ siêu tập" span={2}>
            <Form.Item name={'collection'} style={FORM_NO_BOTTOM_MARGIN}>
              <Select
                allowClear
                style={{ width: '100%', color: 'black' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={collectionInit}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" span={3}>
            <Form.Item name={'name'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Nhãn" span={3}>
            <Form.Item name={'tags'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Chọn nhãn cho sản phẩm"
                options={tagInit}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái" span={3}>
            <Form.Item name={'collection'} style={FORM_NO_BOTTOM_MARGIN}>
              <Switch defaultChecked />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Hỉnh ảnh" span={3}>
            <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={FORM_NO_BOTTOM_MARGIN}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                beforeUpload={file => {
                  return false;
                }}
                onChange={onChange}
              >
                {fileList.length < 4 && '+ Thêm ảnh'}
              </Upload>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={3}>
            <Form.Item name={'note'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
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
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Giá nhập (đ)" span={3}>
            <Form.Item name={'import_price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
              <InputNumber
                defaultValue={100}
                min={1000}
                controls={false}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Giá bán (đ)" span={3}>
            <Form.Item name={'price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
              <InputNumber
                min={1000}
                controls={false}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <ProductInventoryCreateForm form={form} />
      </Space>
    </Form>
  )
}

export default ProductCreateForm
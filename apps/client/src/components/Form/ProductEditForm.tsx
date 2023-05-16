import { Form, Space, Descriptions, Select, Input, InputNumber, Switch, Upload, Divider, UploadFile, UploadProps } from 'antd'
import AntdImgCrop from 'antd-img-crop'
import React, { FC, useState } from 'react'
import { REQUIRED_RULE } from '../../constant/formRules'
import { FORM_NO_BOTTOM_MARGIN } from '../../constant/styles'
import ProductInventoryForm from './ProductInventoryForm'
import ProductFormProps from '../../interface/ProductFormProps'

interface ProductEditFormProps extends  ProductFormProps {

}

const ProductEditForm : FC<ProductEditFormProps> = ({ form, collectionInit, discountInit, tagInit }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        ]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

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
            <Descriptions title="Chinh sua thông tin sản phẩm" bordered>
              <Descriptions.Item label="ID" span={1}>1</Descriptions.Item>
              <Descriptions.Item label="Bộ siêu tập" span={2}>
                <Form.Item initialValue={collectionInit} name={'collection'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    allowClear
                    style={{ width: '100%', color: 'black'}}
                    placeholder="Chọn nhãn cho sản phẩm"
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Tên sản phẩm" span={3}>
                <Form.Item name={'name'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Nhãn" span={3}>
                <Form.Item initialValue={tagInit} name={'tags'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Chọn nhãn cho sản phẩm"
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán (đ)" span={1}>
                <Form.Item name={'price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Lượt xem" span={1}>
                1000
              </Descriptions.Item>
              <Descriptions.Item label="Lượt mua" span={1}>
                1000
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={3}>
                <Form.Item name={'collection'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
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
                  <AntdImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                    >
                      {fileList.length < 4 && '+ Thêm ảnh'}
                    </Upload>
                  </AntdImgCrop>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú" span={3}>
                <Form.Item name={'note'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Input.TextArea style={{ width: '100%', height: 150 }} />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giảm giá (%)" span={3}>
                <Form.Item name={'discount'} initialValue={discountInit} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Chọn mã giảm giá áp dụng cho sản phẩm"
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá nhập (đ)" span={3}>
                <Form.Item name={'import_price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán (đ)" span={3}>
                <Form.Item name={'actual_price'} rules={[REQUIRED_RULE]} style={FORM_NO_BOTTOM_MARGIN}>
                  <InputNumber
                    defaultValue={100}
                    min={0}
                    max={100}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <ProductInventoryForm />
          </Space>
    </Form>
  )
}

export default ProductEditForm
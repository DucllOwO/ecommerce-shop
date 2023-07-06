import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Row, Space, Typography } from 'antd';
import { SIZES } from '../../constant/constant';
import IProduct from '../../interface/Product';
import IProduct_item from '../../interface/ProductItem';

const inventoryData = [
  {
    color: '',
    amount: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
  },
];

const initialValues = {
  import_price: '',
  actual_price: '',
  inventory: inventoryData.map((item, index) => ({
    ...item,
    key: index
  }))
};

interface ProductInventoryCreateFormProps {
  isReadOnly?: boolean;
  form: FormInstance<any>
}

const ProductInventoryCreateForm: React.FC<ProductInventoryCreateFormProps> = ({ isReadOnly = false, form }) => {
  // const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);

  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: '100%' }}
      initialValues={initialValues}
      disabled={isReadOnly}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <Form.List name="inventory">
            {(fields, { add, remove }) => (
              <Space direction='vertical' style={{ marginBottom: 5, width: '100%' }}>
                {isReadOnly ? null :
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm màu
                    </Button>
                  </Form.Item>}
                <Space wrap style={{ justifyContent: 'space-evenly', rowGap: 20, width: '100%' }}>
                  {fields.map((field) => (
                    <Space direction='vertical'>
                      <Space direction='horizontal' align='center'>
                        <Form.Item name={[field.name, `color`]} label="Màu sắc" style={{ marginBottom: 0 }}>
                          <Input />
                        </Form.Item>
                        {isReadOnly ? null :
                          <MinusCircleOutlined onClick={() => remove(field.name)} disabled={isReadOnly} />}
                      </Space>

                      {
                        SIZES.map(size => <Row align={'middle'}>
                          <Col span={8} >
                            <Typography.Text>Kích cỡ: {size}</Typography.Text>
                          </Col>
                          <Col span={10} offset={2}>
                            <Form.Item
                              label='Số lượng'
                              name={[field.name, 'amount', size]}
                              style={{ marginBottom: 0 }}
                            >
                              <InputNumber />
                            </Form.Item>
                          </Col>
                        </Row>)
                      }
                    </Space>

                  ))}
                </Space>
              </Space>
            )}
          </Form.List>
        </Row>
      </Space>
    </Form>
  );
};

export default ProductInventoryCreateForm;
import { UserOutlined } from '@ant-design/icons'
import { Row, Col, Form, Avatar, Input, Button, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import productData from '../../assets/fake-data/products'
import ProductCard from './components/ProductCard'

const UserProfileSetting = () => {
  const relatedProducts = productData.getProducts(8)
  return (
    <Row justify="center" style={{ flexDirection: 'column' }}>
      <Form layout='vertical' style={{ paddingTop: 20, width: '30vw', alignSelf: 'center' }}>
        <Form.Item
          name="avatar"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Avatar size={128} icon={<UserOutlined />} />
          {/* Add logic to upload and display the user's avatar */}
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>

      <Space direction='vertical' style={{ width: '30vw', padding: '20px' }}>
        <Title level={3} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>SẢN PHẨM LIÊN QUAN</Title>
        <Space>
          {
            relatedProducts.map((item, index) => (
              <ProductCard
                id={index}
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
              />
            ))
          }
        </Space>
      </Space>
    </Row>
  )
}

export default UserProfileSetting
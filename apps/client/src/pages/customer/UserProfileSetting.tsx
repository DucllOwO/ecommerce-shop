import { UserOutlined } from '@ant-design/icons'
import { Row, Col, Form, Avatar, Input, Button, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import productData from '../../assets/fake-data/products'
import ProductCard from './components/ProductCard'
import { useState } from 'react'
import LocalStorage from '../../helper/localStorage'
import { useForm } from 'antd/es/form/Form'
import { updateUser } from '../../api/CustomerAPI'
import SuccessAlert from '../../components/Alert/SuccessAlert'
import ErrorAlert from '../../components/Alert/ErrorAlert'

const UserProfileSetting = () => {
  const relatedProducts = productData.getProducts(8)
  const [currentUser, setCurrentUser] = useState(LocalStorage.getItem('user'));
  const [form] = useForm();

  const handleOnClick = () => {
    form.validateFields().then((data: any) => {
      console.log(data)
      const newUser = {
        firstname: data.firstName,
        lastname: data.lastName,
        phone_number: data.phoneNumber,
        address: data.address
      }
      updateUser(newUser, currentUser?.id).then(() => {
        SuccessAlert("Cập nhật thông tin thành công");
      }).catch(() => {
        ErrorAlert("Cập nhập thông tin không thành công");
      })
    })
  }
  return (
    <Row justify="center" style={{ flexDirection: 'column' }}>
      <Form layout='vertical' style={{ paddingTop: 20, width: '30vw', alignSelf: 'center' }} form={form}>
        <Form.Item
          name="avatar"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Avatar size={128} icon={<UserOutlined />} src={currentUser?.avatar}/>
          {/* Add logic to upload and display the user's avatar */}
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
          initialValue={currentUser?.firstname}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
          initialValue={currentUser?.lastname}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          initialValue={currentUser?.address}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          initialValue={currentUser?.phone_number}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          initialValue={currentUser?.email}
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
          <Button type="primary" htmlType="submit" onClick={handleOnClick}>
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
                slug={item.slug}
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
import { UserOutlined } from '@ant-design/icons'
import { Row, Col, Form, Avatar, Input, Button, Space, Switch } from 'antd'
import Title from 'antd/es/typography/Title'
import productData from '../../assets/fake-data/products'
import ProductCard from './components/ProductCard'
import { useEffect, useState } from 'react'
import LocalStorage from '../../helper/localStorage'
import { useForm } from 'antd/es/form/Form'
import { updateUser } from '../../api/CustomerAPI'
import SuccessAlert from '../../components/Alert/SuccessAlert'
import ErrorAlert from '../../components/Alert/ErrorAlert'
import { updatePassword } from '../../api/accountAPI'

const UserProfileSetting = () => {
  const relatedProducts = productData.getProducts(8)
  const [currentUser, setCurrentUser] = useState(LocalStorage.getItem('user'));
  const [form] = useForm();
  const isPassWordChange = Form.useWatch('isPasswordChange', form)

  useEffect(() => {
    console.log(isPassWordChange)
  }, [isPassWordChange])


  const handleOnClick = () => {
    form.validateFields().then((data: any) => {
      console.log(data)
      const newUser = {
        firstname: data.firstName,
        lastname: data.lastName,
        phone_number: data.phoneNumber,
        address: data.address
      }
      updateUser(newUser, currentUser?.id).then((res) => {
        LocalStorage.setItem('user', res.data)
        SuccessAlert("Cập nhật thông tin thành công");
      }).catch(() => {
        ErrorAlert("Cập nhập thông tin không thành công");
      })

      if (isPassWordChange)
        updatePassword(data.email, data.password).then(() => {
          SuccessAlert("Cập nhật mật khẩu thành công");
        }).catch(() => {
          ErrorAlert("Cập nhập mật khẩu không thành công");
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
          <Avatar size={128} icon={<UserOutlined />} src={currentUser?.avatar} />
        </Form.Item>
        <Form.Item
          label="Họ"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
          initialValue={currentUser?.lastname}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
          initialValue={currentUser?.firstname}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          initialValue={currentUser?.address}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
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
          label="Bạn có muốn đổi mật khẩu"
          tooltip={'Nếu cần đổi mật khẩu hãy bấm vào nút này.'}
          name="isPasswordChange"
          rules={[{ required: true, message: '' }]}
          initialValue={false}
        >
          <Switch></Switch>
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[isPassWordChange && { required: true, message: 'Vui lòng nhập mật khẩu' }]}

        >
          <Input.Password disabled={!isPassWordChange} />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit" onClick={handleOnClick}>
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default UserProfileSetting
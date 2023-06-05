import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Input, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import productData from '../../assets/fake-data/products'
import { EMAIL_FORMAT_RULE, PHONENUMBER_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'
import CartItem, { CartItemType } from './components/CartItem'
import Helmet from './components/Helmet'
import CartTable from './components/table/CartTable'
import LocalStorage from '../../helper/localStorage'
import { useForm } from 'antd/es/form/Form'
import { createOrder } from '../../api/CustomerAPI'

const paymentMethods = [
    { value: 'cod', label: 'Thanh toán khi nhận hàng' },
    { value: 'momo', label: 'Chuyển tiền qua MoMo' },
    { value: 'bank', label: 'Chuyển tiền qua ngân hàng' },
]

const Cart = () => {
    const nav = useNavigate();

    const [cartProducts, setCartProducts] = useState(LocalStorage.getItem('cart'));

    const [totalProducts, setTotalProducts] = useState();

    const [totalPrice, setTotalPrice] = useState(0);

    const [currentUser, setCurrentUser] = useState(LocalStorage.getItem('user'));

    

    const [form] = useForm();

    const onFinish = (values: any) => {
        console.log(values)
    }

    const submitOrder = () => {
        form.validateFields().then((data) => {
            if(LocalStorage.getItem('user'))
            {
                const newOrder = {
                    total_cost: totalPrice,
                    buyer: {
                        connect: { 
                            id: LocalStorage.getItem('user').id
                        }
                    },
                    Order_detail: {
                        createMany: cartProducts
                    }
                }
                createOrder(newOrder)
                .then((data) => nav('/payment'))
                .catch((error) => console.log(error));    
            }
            else {    
                const newOrder = {
                    total_cost: totalPrice,
                    buyer: {
                        create: { 
                            firstname: data.firstname,
                            lastname: data.lastname,
                            phone_number: data.phone_number,
                            address: data.address,
                        }
                    },
                    Order_detail: {
                        createMany: cartProducts
                    }
                }
                createOrder(newOrder)
                .then((data) => nav('/payment'))
                .catch((error) => console.log(error));            
            }
        })
    }

    return (
        <Helmet title="Giỏ hàng">
            <Row style={{ marginTop: 20 }}>
                <Col span={14} offset={1}>
                    <CartTable cartList={cartProducts}/>
                </Col>
                <Col span={8} offset={1}>
                    <Space direction='vertical' style={{ width: '90%' }}>
                        <Form onFinish={onFinish} form={form} layout='vertical' style={{ paddingTop: 20 }}>
                            <Form.Item
                                label='email'
                                name="email"
                                rules={[REQUIRED_RULE, EMAIL_FORMAT_RULE]}
                                initialValue={currentUser.email}
                            >
                                <Input placeholder='Email của bạn' disabled={currentUser ? true : false}/>
                            </Form.Item>
                            <Form.Item
                                label="Họ"
                                name="lastname"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.lastname}

                            >
                                <Input  disabled={currentUser ? true : false}/>
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="firstname"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.firstname}
                            >
                                <Input  disabled={currentUser ? true : false}/>
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.address}

                            >
                                <Input  disabled={currentUser ? true : false}/>
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[REQUIRED_RULE, PHONENUMBER_FORMAT_RULE]}
                                initialValue={currentUser.phone_number}

                            >
                                <Input disabled={currentUser ? true : false}/>  
                            </Form.Item>
                            <Form.Item
                                style={{flexDirection: 'row'}}
                                label="Voucher"
                                name="voucher"
                            >
                                <Input style={{width: "80%"}}/>
                                <Button style={{marginLeft: 5}}>Kiểm tra</Button>
                            </Form.Item>
                            <Form.Item
                                label="Phương thức thanh toán"
                                name="paymentMethod">
                                <Select placeholder='Chọn phương thức thanh toán' options={paymentMethods} />
                            </Form.Item>
                            <div className="cart__info">
                                <div className="cart__info__txt">
                                    <p>
                                        Bạn đang có {cartProducts.length} sản phẩm trong giỏ hàng
                                    </p>
                                    <div
                                        className="cart__info__txt__price">
                                        <span>Thành tiền:</span> <span>{100000000}</span>
                                    </div>
                                </div>
                                <div className="cart__info__btn">
                                    <Button type='primary' htmlType="submit" style={{ width: '100%' }} onClick={submitOrder}>
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Space>
                </Col>
            </Row>


        </Helmet>
    )
}

export default Cart

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Input, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import productData from '../../assets/fake-data/products'
import { EMAIL_FORMAT_RULE, PHONENUMBER_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'
import CartItem, { CartItemType } from './components/CartItem'
import Helmet from './components/Helmet'
import CartTable from './components/table/CartTable'

const paymentMethods = [
    { value: 'cod', label: 'Thanh toán khi nhận hàng' },
    { value: 'momo', label: 'Chuyển tiền qua MoMo' },
    { value: 'bank', label: 'Chuyển tiền qua ngân hàng' },
]

const Cart = () => {

    const [cartProducts, setCartProducts] = useState(productData.getProducts(4))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    return (
        <Helmet title="Giỏ hàng">
            <Row style={{ marginTop: 20 }}>
                <Col span={12} offset={1}>
                    <CartTable />
                </Col>
                <Col span={10} offset={1}>
                    <Space direction='vertical' style={{ width: '90%' }}>
                        <Form layout='vertical' style={{ paddingTop: 20 }}>
                            <Form.Item
                                label='email'
                                name="email"
                                rules={[REQUIRED_RULE, EMAIL_FORMAT_RULE]}
                            >
                                <Input placeholder='Email của bạn' />
                            </Form.Item>
                            <Form.Item
                                label="Họ"
                                name="lastname"
                                rules={[REQUIRED_RULE]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="firstname"
                                rules={[REQUIRED_RULE]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[REQUIRED_RULE]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[REQUIRED_RULE, PHONENUMBER_FORMAT_RULE]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Voucher"
                                name="voucher"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phương thức thanh toán"
                                name="paymentMethod">
                                <Select placeholder='Chọn phương thức thanh toán' options={paymentMethods} />
                            </Form.Item>
                        </Form>
                        <div className="cart__info">
                            <div className="cart__info__txt">
                                <p>
                                    Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                                </p>
                                <div
                                    className="cart__info__txt__price">
                                    <span>Thành tiền:</span> <span>{100000000}</span>
                                </div>
                            </div>
                            <div className="cart__info__btn">
                                <Button type='primary' style={{ width: '100%' }}>
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </Space>
                </Col>
            </Row>


        </Helmet>
    )
}

export default Cart

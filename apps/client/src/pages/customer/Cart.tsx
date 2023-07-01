import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Image, Input, Row, Select, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import productData from '../../assets/fake-data/products'
import { EMAIL_FORMAT_RULE, PHONENUMBER_FORMAT_RULE, REQUIRED_RULE } from '../../constant/formRules'
import CartItem, { CartItemType } from './components/CartItem'
import Helmet from './components/Helmet'
import CartTable from './components/table/CartTable'
import LocalStorage from '../../helper/localStorage'
import { useForm } from 'antd/es/form/Form'
import { createOrder, createReceipt, deleteCart, getCart, getVoucher } from '../../api/CustomerAPI'
import Search from 'antd/es/transfer/search'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import ErrorAlert from '../../components/Alert/ErrorAlert'
import SuccessAlert from '../../components/Alert/SuccessAlert'
import ICart from '../../interface/Cart'
import { getVietQR } from '../../api/paymentAPI'
import { CheckoutContext, CheckoutProvider } from '../../context/CheckoutContext'
import { formatNumberWithComma } from '../../helper/utils'

const COD = "cod";
const BANK = "bank";

const paymentMethods = [
    { value: COD, label: 'Thanh toán khi nhận hàng' },
    { value: BANK, label: 'Chuyển tiền qua ngân hàng' },
]

const Cart = () => {
    const nav = useNavigate();
    const checkOut = useContext(CheckoutContext);


    const [cartProducts, setCartProducts] = useState<ICart[]>(LocalStorage.getItem('cart'));

    const [totalPrice, setTotalPrice] = useState(0);

    const [discountPrice, setDiscountPrice] = useState(0);

    const [currentUser, setCurrentUser] = useState(LocalStorage.getItem('user'));

    const [submitLoading, setSubmitLoading] = useState(false)



    const [form] = useForm();

    useEffect(() => {
        setTotalPrice(getTotalPrice());
        setDiscountPrice(getTotalPrice());
    }, [cartProducts])

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartProducts.forEach((item: any) => {
            totalPrice += (item.product_item.product.price * item.quantity);
        });
        return totalPrice;
    }

    const onFinish = (values: any) => {
        console.log(values)
    }

    const submitOrder = () => {
        setSubmitLoading(true)
        form.validateFields().then((data) => {
            const newOrder = {
                firstname: data.firstname,
                lastname: data.lastname,
                phone_number: data.phoneNumber,
                address: data.address,
                total_cost: discountPrice,
                buyer: LocalStorage.getItem('user') ? {
                    connect: {
                        id: LocalStorage.getItem('user').id
                    }
                } : undefined,
                Order_detail: {
                    createMany: {
                        data: cartProducts.map((item: ICart) => { return { item_id: item.id } })
                    }
                }
            }
            createOrder(newOrder)
                .then((response) => {
                    // SuccessAlert("Đặt hàng thành công"); 
                    const newReceipt = {
                        cost: discountPrice,
                        voucher: data.voucher ? {
                            connect: {
                                code: data.voucher
                            }
                        } : undefined,
                        order: {
                            connect: {
                                id: response.data.id
                            }
                        },
                        paymentMethod: data.paymentMethod,
                    }
                    console.log(newReceipt)
                    createReceipt(newReceipt).then(() => {
                        if (currentUser)
                            cartProducts.forEach((data) => {
                                deleteCart(data.id);
                            })
                        LocalStorage.setItem('cart', []);
                        setCartProducts([]);
                        checkOut?.setOrder(response.data)
                        console.log("🚀 ~ file: Cart.tsx:119 ~ createReceipt ~ response.data:", response.data)
                        if (data.paymentMethod === COD)
                            nav(`/checkout/cash-on-delivery/${response.data.id}`);
                        else
                            nav(`/checkout/bank/${response.data.id}`);

                    }).catch((error) => {
                        console.log(error);
                        throw new Error();
                    })
                })
                .catch((error) => console.log(error)).finally(() => setSubmitLoading(false));
        })
    }

    const handleOnSearch = async (voucherCode: string) => {
        console.log(voucherCode)
        getVoucher(voucherCode).then((data) => {
            console.log(data.data)
            if (data.data.length == 0) {
                ErrorAlert("Mã giảm giá không hợp lệ");
                form.resetFields(["voucher"])
                setDiscountPrice(totalPrice);
            }
            else {
                setDiscountPrice(totalPrice - totalPrice * data.data[0].discount / 100);
                SuccessAlert("Sử dụng voucher thành công");
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Helmet title="Giỏ hàng">
            <Row style={{ marginTop: 20 }}>
                <Col span={14} offset={1}>
                    <CartTable cartList={cartProducts} setCartList={setCartProducts} />
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
                                <Input placeholder='Email của bạn' disabled={currentUser ? true : false} />
                            </Form.Item>
                            <Form.Item
                                label="Họ"
                                name="lastname"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.lastname}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="firstname"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.firstname}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[REQUIRED_RULE]}
                                initialValue={currentUser.address}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[REQUIRED_RULE, PHONENUMBER_FORMAT_RULE]}
                                initialValue={currentUser.phone_number}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ flexDirection: 'row' }}
                                label="Voucher"
                                name="voucher"
                            >
                                <Input.Search
                                    placeholder="Voucher code"
                                    enterButton="Kiểm tra"
                                    size="large"
                                    onSearch={handleOnSearch} />
                            </Form.Item>
                            <Form.Item
                                label="Phương thức thanh toán"
                                name="paymentMethod"
                                rules={[REQUIRED_RULE]}>
                                <Select placeholder='Chọn phương thức thanh toán' options={paymentMethods} />
                            </Form.Item>
                            <div className="cart__info">
                                <div className="cart__info__txt">
                                    <p>
                                        Bạn đang có {cartProducts?.length} sản phẩm trong giỏ hàng
                                    </p>
                                    <div
                                        className="cart__info__txt__price">
                                        <span>Thành tiền:</span> <span>{formatNumberWithComma(discountPrice !== 0 ? discountPrice : totalPrice)}</span>
                                    </div>
                                </div>
                                <div className="cart__info__btn">
                                    <Button loading={submitLoading} type='primary' htmlType="submit" style={{ width: '100%' }} onClick={submitOrder}>
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

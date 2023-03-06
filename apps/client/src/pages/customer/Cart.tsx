import { Button, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import productData from '../../assets/fake-data/products'
import CartItem, { CartItemType } from './components/CartItem'
import Helmet from './components/Helmet'
import CartTable from './components/table/CartTable'

const Cart = () => {


    const [cartProducts, setCartProducts] = useState(productData.getProducts(4))

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    return (
        <Helmet title="Giỏ hàng">
            <Row>
                <Col span={16} offset={1}>
                    <CartTable />
                </Col>
                <Col span={6} offset={1}>
                    <div className="cart__info">
                        <div className="cart__info__txt">
                            <p>
                                Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                            </p>
                            <div className="cart__info__txt__price">
                                <span>Thành tiền:</span> <span>{100000000}</span>
                            </div>
                        </div>
                        <div className="cart__info__btn">
                            <Button type='default' style={{ width: '100%' }}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>


        </Helmet>
    )
}

export default Cart

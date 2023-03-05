import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import CartItem, { CartItemType } from './components/CartItem'
import Helmet from './components/Helmet'

const Cart = () => {


    const [cartProducts, setCartProducts] = useState<Array<CartItemType>>([])

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
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
                        <Button>
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button>
                                Tiếp tục mua hàng
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts ? cartProducts.map((item: CartItemType, index) => (
                            <CartItem key={index} {...item} />
                        )) : null
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart

import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export type CartItemType = {
    image01: string,
    quantity: string,
    title: string,
    color: string,
    size: string,
    slug: string
}

const CartItem = (props: CartItemType) => {
    const [item, setItem] = useState<CartItemType>(props)

    return (
        <div className="cart__item" >
            <div className="cart__item__image">
                <img src={item.image01} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item.title} - ${item.color} - ${item.size}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    0
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn">
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            0
                        </div>
                        <div className="product__info__item__quantity__btn">
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='bx bx-trash'></i>
                </div>
            </div>
        </div>
    )
}

export default CartItem

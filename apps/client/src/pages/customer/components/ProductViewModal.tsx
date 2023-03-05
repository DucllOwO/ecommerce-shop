import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import ProductView from './ProductView'

const ProductViewModal = () => {


    const [product, setProduct] = useState(undefined)

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product} />
                <div className="product-view__modal__content__close">
                    <Button
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductViewModal

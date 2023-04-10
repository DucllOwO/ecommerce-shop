import { Button, Col, Image, InputNumber, Row, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import productData from '../../../assets/fake-data/products'

import img01 from '../../../assets/images/products/ao-polo-nam-apm5351-nav-2-yodyvn.jpg'

const ProductView = () => {

    let product = productData.getProducts(1)[0]

    const [previewImg, setPreviewImg] = useState(product.image01)

    const [descriptionExpand, setDescriptionExpand] = useState(true)

    const [color, setColor] = useState(undefined)

    const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setPreviewImg(product.image01)
        setQuantity(1)
        setColor(undefined)
        setSize(undefined)
    }, [product])


    return (
        <div className="product">
            <div className="product__images">

                <div className="product__images__main">
                    <Row>
                        <Col span={11}>
                            <Image src={img01} />
                        </Col>
                        <Col offset={1} span={11}>
                            <Image src={img01} />

                        </Col>

                    </Row>
                    <Row style={{ margin: '20px 0' }}>
                        <Col span={11}>
                            <Image src={img01} />
                        </Col>
                        <Col span={11} offset={1}>

                            <Image src={img01} />
                        </Col>
                    </Row>
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content">{product.description}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button onClick={(e) => {
                        setDescriptionExpand(prev => !prev)
                    }}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
                <Space>

                </Space>
            </div>

            <div className="product__info">
                <h1 className="product__info__title">{product.title}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {1000000}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`}>
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`}>
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div>
                        <InputNumber defaultValue={100} />
                    </div>
                </div>
                <div className="product__info__item">
                    <Button>Thêm vào giỏ</Button>
                    <Button>Mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content">{product.description}</div>
                <div className="product-description__toggle">
                    <Button onClick={(e) => {
                        setDescriptionExpand(prev => !prev)
                    }}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductView

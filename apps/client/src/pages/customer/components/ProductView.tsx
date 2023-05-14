import { Button, Col, Image, InputNumber, Row, Space } from 'antd'
import React, { useState, useEffect } from 'react'
import productData from '../../../assets/fake-data/products'

import img01 from '../../../assets/images/products/ao-polo-nam-apm5351-nav-2-yodyvn.jpg'
import { fetchProduct } from '../../../api/CustomerAPI'
import { IProduct } from '../../../interface/Product'
import { IProductItem } from '../../../interface/ProductItem'

const ProductView = (props: ProductViewProps) => {

    const [product, setProduct] = useState<IProduct>();

    const [previewImg, setPreviewImg] = useState<string[]>();

    const [descriptionExpand, setDescriptionExpand] = useState(true)

    const [color, setColor] = useState<string[]>()

    const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct(props.id).then((data) => {
            console.log(data.data)
            setProduct(data.data);
            setPreviewImg(data.data?.image);
            setColor(Array.from(new Set(data.data.ProductItem?.map((data: IProductItem) => data.color))))
            setColor(Array.from(new Set(data.data.ProductItem?.map((data: IProductItem) => data.size))))
        })
    }, [props])


    return (
        <div className="product">
            <div className="product__images">

                <div className="product__images__main">
                    <Row>
                        <Col span={11}>
                            <Image src={previewImg? previewImg[0] : undefined} />
                        </Col>
                        <Col offset={1} span={11}>
                            <Image src={previewImg? previewImg[1] : undefined} />

                        </Col>

                    </Row>
                    <Row style={{ margin: '20px 0' }}>
                        <Col span={11}>
                            <Image src={previewImg? previewImg[2] : undefined} />
                        </Col>
                        <Col span={11} offset={1}>

                            <Image src={previewImg? previewImg[3] : undefined} />
                        </Col>
                    </Row>
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content">{product?.description}</div>
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
                <h1 className="product__info__title">{product?.name}</h1>
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
                        {/* {
                            color.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`}>
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        } */}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {/* {
                            product.size.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`}>
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))
                        } */}
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div>
                        <InputNumber defaultValue={1} />
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
                <div className="product-description__content">{product?.description}</div>
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
type ProductViewProps = {
    id: number
}
export default ProductView

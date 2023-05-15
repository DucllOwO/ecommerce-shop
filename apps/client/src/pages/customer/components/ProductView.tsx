import { Button, Col, Image, InputNumber, Radio, Row, Space } from 'antd'
import { useState, useEffect } from 'react'
import { fetchProduct } from '../../../api/CustomerAPI'

const ProductView = (props: ProductViewProps) => {

    const [product, setProduct] = useState<any>();

    const [previewImg, setPreviewImg] = useState<string[]>();

    const [descriptionExpand, setDescriptionExpand] = useState(true)

    const [color, setColor] = useState<string[]>()

    const [size, setSize] = useState<string[]>()

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct(props.id).then((data) => {
            console.log(data.data)
            setProduct(data.data);
            setPreviewImg(data.data?.image);
            setColor(Array.from(new Set(data.data.Product_item?.map((data: any) => data.color))))
            setSize(Array.from(new Set(data.data.Product_item?.map((data: any) => data.size))))
        })
    }, [props])


    return (
        <div className="product">
            <div className="product__images">

                <div className="product__images__main">
                    <Row>
                        <Col span={11}>
                            <Image src={previewImg ? previewImg[0] : undefined} />
                        </Col>
                        <Col offset={1} span={11}>
                            <Image src={previewImg ? previewImg[1] : undefined} />

                        </Col>

                    </Row>
                    <Row style={{ margin: '20px 0' }}>
                        <Col span={11}>
                            <Image src={previewImg ? previewImg[2] : undefined} />
                        </Col>
                        <Col span={11} offset={1}>

                            <Image src={previewImg ? previewImg[3] : undefined} />
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
                        <Radio.Group buttonStyle="solid">
                            {
                                color?.map((item, index) => (
                                    <Radio.Button value="item">{item}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        <Radio.Group buttonStyle="solid">
                            {
                                size?.map((item, index) => (
                                    <Radio.Button value="item">{item}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
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

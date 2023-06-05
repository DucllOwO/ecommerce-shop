import { Button, Carousel, Col, Image, InputNumber, Radio, Row, Space } from 'antd'
import { useState, useEffect } from 'react'
import { fetchProduct } from '../../../api/CustomerAPI'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss'
import ReactImageGallery from 'react-image-gallery';
import { ReactImageGalleryItem } from 'react-image-gallery';
import IProduct from '../../../interface/Product';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../../../helper/localStorage';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const ProductView = (props: ProductViewProps) => {
    const [product, setProduct] = useState<IProduct>();

    const [previewImg, setPreviewImg] = useState<ReactImageGalleryItem[]>();

    const [descriptionExpand, setDescriptionExpand] = useState(true);

    const [color, setColor] = useState<string[]>();

    const [size, setSize] = useState<string[]>();

    const [quantity, setQuantity] = useState(1);

    const [selectedSize, setSelectedSize] = useState();

    const nav = useNavigate();

    useEffect(() => {
        fetchProduct(props.id).then((data) => {
            console.log(data.data)
            setProduct(data.data);
            setPreviewImg(data.data?.image.map((item: string) => {return {
                original: item ? item : "",
                thumbnail: item ? item : "",
            }}));
            setColor(Array.from(new Set(data.data.Product_item?.map((data: any) => data.color))))
            setSize(Array.from(new Set(data.data.Product_item?.map((data: any) => data.size))))
        })
    }, [props])


    return (
        <Row>
            <Col span={13} style={{ marginTop: 20 }}>
                <ImageGallery items={previewImg ? previewImg : images} thumbnailPosition={'left'} showPlayButton={false} showFullscreenButton={false} />
            </Col>
            <Col offset={1} span={10}>
                <div className="product__info">
                    <h1 className="product__info__title">{product?.name}</h1>
                    <div className="product__info__item">
                        <span className="product__info__item__price">
                            {product?.price}
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
                                        <Radio.Button onClick={(value) => {setSelectedSize(value)}} value="item">{item}</Radio.Button>
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
                            <InputNumber defaultValue={1} onChange={(value) => setQuantity(value)}/>
                        </div>
                    </div>
                    <div className="product__info__item">
                        <Button onClick={() => {
                            if(LocalStorage.getItem('cart') && !LocalStorage.getItem('cart').includes(product))
                                LocalStorage.setItem('cart', [...LocalStorage.getItem('cart') ,{...product, quantity: quantity}]);
                            else if(!LocalStorage.getItem('cart'))
                                LocalStorage.setItem('cart', [{...product, quantity: quantity}])
                        }}>Thêm vào giỏ</Button>
                        <Button onClick={() => {
                            if(LocalStorage.getItem('cart') && !Array(LocalStorage.getItem('cart')).includes(product))
                                LocalStorage.setItem('cart', [...LocalStorage.getItem('cart') ,{...product, quantity: quantity}]);
                            else if(!LocalStorage.getItem('cart'))
                                LocalStorage.setItem('cart', [{...product, quantity: quantity}])
                            nav('/cart');
                        }}>Mua ngay</Button>
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
                                !descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
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
            </Col>
        </Row>
    )
}
type ProductViewProps = {
    id: number
}
export default ProductView

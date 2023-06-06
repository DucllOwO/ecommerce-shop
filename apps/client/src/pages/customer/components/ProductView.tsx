import { Button, Carousel, Col, Image, InputNumber, Radio, RadioChangeEvent, Row, Space } from 'antd'
import { useState, useEffect } from 'react'
import { fetchProduct } from '../../../api/CustomerAPI'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss'
import ReactImageGallery from 'react-image-gallery';
import { ReactImageGalleryItem } from 'react-image-gallery';
import IProduct from '../../../interface/Product';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../../../helper/localStorage';
import ErrorAlert from '../../../components/Alert/ErrorAlert';

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

    const [color, setColor] = useState<object[]>();

    const [size, setSize] = useState<object[]>();

    const [quantity, setQuantity] = useState(1);

    const [selectedSize, setSelectedSize] = useState();

    const [selectedColor, setSelectedColor] = useState();

    const nav = useNavigate();

    useEffect(() => {
        fetchProduct(props.id).then((data) => {
            console.log(data.data)
            setProduct(data.data);
            setPreviewImg(data.data?.image.map((item: string) => {
                return {
                    original: item ? item : "",
                    thumbnail: item ? item : "",
                }
            }));
            const colorSet = Array.from(new Set(data.data.Product_item?.map((data: any) => data.color)));
            setColor(colorSet.map((data) => {
                return {
                    value: data,
                    label: data,
                    disabled: false
                }
            }))
            const sizeSet = Array.from(new Set(data.data.Product_item?.map((data: any) => data.size)));
            setSize(sizeSet.map((data) => {
                return {
                    value: data,
                    label: data,
                    disabled: false
                }
            }))
        })
    }, [props])


    const handleColorOnClick = ({ target }: RadioChangeEvent) => {
        console.log(color)
        setSelectedColor(target.value)
        const size = Array.from(new Set(product?.Product_item.filter((item) => item.color === target.value).map((data) => data.size)));

        console.log(size)

        setSize((prev) => prev?.map((data) => {
            if (!size?.some((item) => item === data.value))
                return { ...data, disabled: true };
            else
                return { ...data, disabled: false };
        })
        )
    }
    const handleSizeOnClick = ({ target }: RadioChangeEvent) => {
        setSelectedSize(target.value);
        const color = Array.from(new Set(product?.Product_item.filter((item) => item.size === target.value).map((data) => data.color)));

        console.log(color)

        setColor((prev) => prev?.map((data) => {
            if (!color?.some((item) => item === data.value))
                return { ...data, disabled: true };
            else
                return { ...data, disabled: false };
        })
        )
    }
    const handleAddToCart = () => {
        if (selectedColor && selectedSize) {
            const productItem = product?.Product_item.filter((item) => item.color === selectedColor && item.size === selectedSize)
            const selectedItem = {
                id: productItem[0]?.id,
                image: product?.image[0],
                name: product?.name,
                price: product?.price,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize
            }
            if (LocalStorage.getItem('cart') &&
                !Array(LocalStorage.getItem('cart')).some((data: any) => {
                    JSON.stringify(data) === JSON.stringify(selectedItem)
                }))
                LocalStorage.setItem('cart', [...LocalStorage.getItem('cart'), selectedItem]);
            else if (!LocalStorage.getItem('cart'))
                LocalStorage.setItem('cart', [selectedItem])
        }
        else {
            ErrorAlert("Vui lòng chọn size và màu")
        }
    }


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
                            <Radio.Group
                                onChange={handleColorOnClick}
                                options={color}
                                // value={value4}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </div>
                    </div>
                    <div className="product__info__item">
                        <div className="product__info__item__title">
                            Kích cỡ
                        </div>
                        <div className="product__info__item__list">
                            <Radio.Group
                                options={size}
                                onChange={handleSizeOnClick}
                                // value={value4}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </div>
                    </div>
                    <div className="product__info__item">
                        <div className="product__info__item__title">
                            Số lượng
                        </div>
                        <div>
                            <InputNumber defaultValue={1} onChange={(value) => setQuantity(value)} />
                        </div>
                    </div>
                    <div className="product__info__item">
                        <Button
                            onClick={handleAddToCart}
                        >Thêm vào giỏ</Button>
                        <Button onClick={() => {
                            handleAddToCart();
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
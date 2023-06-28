import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { formatNumberWithComma } from '../../../helper/utils'

const ProductCard = (props: ProductCardProps) => {
    let finalPrice = props.discount && props.discount > 0 ? props.discount * props.price : props.price;
    return (
        <div className="product-card">
            <Link to={`/product/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" style={{ borderRadius: 10, width: 250, height: 300 }} />
                    <img src={props.img02} alt="" style={{ borderRadius: 10, width: 250, height: 300 }} />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {formatNumberWithComma(finalPrice)}
                    {props.discount && props.discount > 0 ? <span className="product-card__price__old">
                        <del>{formatNumberWithComma(props?.price)}</del>
                    </span> : null}
                </div>
                <div className="product-card__btn">
                    <Button
                        type='primary'
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </Link>
        </div>
    )
}

type ProductCardProps = {
    id: number
    img01: string,
    img02: string,
    name: string,
    price: number,
    slug: string,
    discount: number | null;
}

export default ProductCard

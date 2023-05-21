import { Link } from 'react-router-dom'
import { Button } from 'antd'

const ProductCard = (props: ProductCardProps) => {
    return (
        <div className="product-card">
            <Link to={`/product/${props.id}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" style={{ borderRadius: 10 }} />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {props.price}
                    <span className="product-card__price__old">
                        <del>{props.price}</del>
                    </span>
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
}

export default ProductCard

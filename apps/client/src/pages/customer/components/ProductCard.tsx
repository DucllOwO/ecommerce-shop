import { Link } from 'react-router-dom'
import { Button } from 'antd'

const ProductCard = (props: ProductCardProps) => {

    return (
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" style={{ borderRadius: 10 }} />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    1000000
                    <span className="product-card__price__old">
                        <del>100000</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Button
                    type='primary'
                >
                    chọn mua
                </Button>
            </div>
        </div>
    )
}

type ProductCardProps = {
    img01: string,
    img02: string,
    name: string,
    price: number,
    slug: string
}

export default ProductCard

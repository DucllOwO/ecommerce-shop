import { Button } from 'antd'
import { Link } from 'react-router-dom'

type SliderItemProps = {
    title: string,
    description: string,
    img: string,
    color: string,
    path: string,
}

const SliderItem = ({ item, active }: { item: SliderItemProps, active: boolean }) => (
    <div className={`hero-slider__item ${active ? 'active' : ''}`}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title color-${item.color}`}>
                <span>{item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{item.description}</span>
            </div>
            <div className="hero-slider__item__info__btn">
                <Link to={item.path}>
                    <Button>
                        xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slider__item__image">
            <div className={`shape bg-${item.color}`}></div>
            <img src={item.img} alt="" />
        </div>
    </div>
)

export default SliderItem

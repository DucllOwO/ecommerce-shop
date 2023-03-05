import { Button, List, Spin } from 'antd'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import productData from '../../assets/fake-data/products'
import FilterTree from './components/FilterTree'
import Helmet from './components/Helmet'
import ProductCard from './components/ProductCard'

const Catalog = () => {

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList);
    const [numOfItem, setNumOfItem] = useState(10)

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter">

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            <FilterTree />
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            <FilterTree />
                        </div>
                    </div>
                </div>
                <div className="catalog__content">
                    <InfiniteScroll
                        dataLength={numOfItem}
                        hasMore={true}
                        loader={<div style={{ textAlign: 'center', display: 'block' }}>
                            <Spin />
                        </div>}
                        next={() => {
                            setTimeout(() => { setNumOfItem(prev => prev + 4) }, 3000)

                        }}
                        style={{ display: 'flex', flexWrap: "wrap" }}
                    >
                        {productData.getProducts(numOfItem).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog

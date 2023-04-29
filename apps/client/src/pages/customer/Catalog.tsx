import { Button, List, Spin } from 'antd'
import { DataNode } from 'antd/es/tree'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import productData from '../../assets/fake-data/products'
import FilterTree from './components/FilterTree'
import Helmet from './components/Helmet'
import ProductCard from './components/ProductCard'
import { fetchProduct } from '../../api/CatalogAPI'
import { Product } from '../../interface/Product'

const treeColorData: DataNode[] = [
    {
        title: 'Màu sắc',
        key: 'color',
        children: [
            {
                title: 'Đỏ',
                key: 'red',
            },
            {
                title: 'Xanh lá',
                key: 'green',
            },
            {
                title: 'Xanh biển',
                key: 'Blue',
            },
            {
                title: 'Cam',
                key: 'orange',
            },
            {
                title: 'Đen',
                key: 'black',
            },
        ],
    }
];

const treeSizeData: DataNode[] = [
    {
        title: 'Kích thước',
        key: 'size',
        children: [
            {
                title: 'XS',
                key: 'xs',
            },
            {
                title: 'S',
                key: 's',
            },
            {
                title: 'M',
                key: 'm',
            },
            {
                title: 'L',
                key: 'l',
            },
            {
                title: 'XL',
                key: 'XL',
            },

        ],
    },

];

const Catalog = () => {
    
    useEffect(() => {
        fetchProduct().then((data)=> {
            console.log(data)
            setProducts(data.data)
        }).catch((error)=> {
            console.log(error)
        })
    },[])

    const [products, setProducts] = useState<Product[]>();
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
                            <FilterTree treeData={treeColorData} />
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            <FilterTree treeData={treeSizeData} />
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
                        {products?.map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item?.image[0]}
                                img02={item?.image[1]}
                                name={item.name}
                                price={item.price}
                                slug="quan-somi"
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog

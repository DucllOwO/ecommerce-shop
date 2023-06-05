import { Button, List, Spin } from 'antd'
import { DataNode } from 'antd/es/tree'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import productData from '../../assets/fake-data/products'
import FilterTree from './components/FilterTree'
import Helmet from './components/Helmet'
import ProductCard from './components/ProductCard'
import { fetchAllProducts } from '../../api/CustomerAPI'
import Product from '../../interface/Product'
import IProduct from '../../interface/Product'

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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        fetchAllProducts().then((data) => {
            console.log(data)
            setProducts(data.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => setIsLoading(false))
    }, [])

    const [products, setProducts] = useState<IProduct[]>();
    const [numOfItem, setNumOfItem] = useState(10)

    return (
        <Helmet title="Sản phẩm">
            <Spin spinning={isLoading}>
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
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={products}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <ProductCard
                                        key={index}
                                        id={item?.id}
                                        img01={item?.image[0]}
                                        img02={item?.image[1]}
                                        name={item.name}
                                        price={item.price}
                                        slug={item.slug}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Spin>
        </Helmet>
    )
}

export default Catalog

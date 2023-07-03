import { List, Spin } from 'antd'
import { DataNode } from 'antd/es/tree'
import { useContext, useEffect, useState } from 'react'
import FilterTree from './components/FilterTree'
import Helmet from './components/Helmet'
import ProductCard from './components/ProductCard'
import { fetchAllProducts } from '../../api/CustomerAPI'
import IProduct from '../../interface/Product'
import { getAllColorsVariant } from '../../api/productAPI'
import { AppContext } from '../../context/AppContext'

const treeSizeData: DataNode[] = [
    {
        title: 'Kích thước',
        key: 'size',
        children: [
            {
                title: 'S',
                key: 'S',
            },
            {
                title: 'M',
                key: 'M',
            },
            {
                title: 'L',
                key: 'L',
            },
            {
                title: 'XL',
                key: 'XL',
            },
            {
                title: 'XXL',
                key: 'XXL',
            },
        ],
    },

];

const Catalog = () => {
    const appContext = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false)
    const [colorFilter, setColorFilter] = useState<DataNode[]>([])

    const [colorCheckedKey, setColorCheckedKey] = useState<React.Key[]>([])
    const [sizeCheckedKey, setSizeCheckedKey] = useState<React.Key[]>([])

    const [products, setProducts] = useState<IProduct[]>([]);
    const [productsFilter, setProductsFilter] = useState<IProduct[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetchAllProducts().then((data) => {
            setProducts(data.data)
            setProductsFilter(data.data)
            getAllColorsVariant().then(resColors => setColorFilter([
                {
                    title: 'Màu sắc',
                    key: 'color',
                    children: resColors.data.map((color: string) => ({ title: color, key: color.trim() }))
                }
            ]))
        }).catch((error) => {
            console.log(error)
        }).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        let productsTemp: IProduct[] = [];
        if (colorCheckedKey.length > 0)
            for (const product of products) {
                for (const productItem of product.product_item) {
                    if (colorCheckedKey.includes(productItem.color)) {
                        productsTemp.push(product);
                        break;
                    }
                }
            }
        if (sizeCheckedKey.length > 0)
            for (const product of products) {
                for (const productItem of product.product_item) {
                    if (sizeCheckedKey.includes(productItem.size.trimEnd())) {
                        productsTemp.push(product);
                        break;
                    }
                }
            }

        console.log("🚀 ~ file: Catalog.tsx:72 ~ useEffect ~ productsTemp:", productsTemp)
        if (colorCheckedKey.length == 0 && sizeCheckedKey.length == 0)
            setProductsFilter(products)
        else
            setProductsFilter(removeDuplicates(productsTemp))
    }, [colorCheckedKey.length, sizeCheckedKey.length])

    const onCheckColor = (checkedKeysValue: React.Key[]) => {
        console.log('onCheck', checkedKeysValue);
        setColorCheckedKey(checkedKeysValue);
    };
    const onCheckSize = (checkedKeysValue: React.Key[]) => {
        console.log('onCheck', checkedKeysValue);
        setSizeCheckedKey(checkedKeysValue);
    };


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
                                <FilterTree treeData={colorFilter} onCheck={onCheckColor} checkedKeys={colorCheckedKey} />
                            </div>
                        </div>

                        <div className="catalog__filter__widget">
                            <div className="catalog__filter__widget__title">
                                Kích cỡ
                            </div>
                            <div className="catalog__filter__widget__content">
                                <FilterTree treeData={treeSizeData} onCheck={onCheckSize} checkedKeys={sizeCheckedKey} />
                            </div>
                        </div>
                    </div>

                    <div className="catalog__content">
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={productsFilter}
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
                                        discount={item.discount?.discount ? item.discount?.discount : null}
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

// Function to remove duplicates by ID
function removeDuplicates(products: IProduct[]) {
    const uniqueProducts = [];
    const ids: number[] = [];

    for (const product of products) {
        if (!ids.includes(product.id)) {
            uniqueProducts.push(product);
            ids.push(product.id);
        }
    }

    return uniqueProducts;
}

export default Catalog

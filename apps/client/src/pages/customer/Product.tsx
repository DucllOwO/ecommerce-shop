import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react'
import productData from '../../assets/fake-data/products'
import Helmet from './components/Helmet';
import ProductCard from './components/ProductCard';
import ProductView from './components/ProductView';

const Product = () => {

  const product = productData.getProducts(1)[0];

  const relatedProducts = productData.getProducts(8)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return (
    <Helmet title={product.title}>
      <Space>

        <ProductView />
      </Space>
      <Space direction='vertical'>
        <Title level={2} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>GỢI Ý CHO BẠN</Title>
        <Space>

          {
            relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))
          }
        </Space>
      </Space>
      <Space direction='vertical'>
        <Title level={2} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>SẢN PHẨM LIÊN QUAN</Title>
        <Space>

          {
            relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))
          }
        </Space>
      </Space>
    </Helmet>
  )
}

export default Product

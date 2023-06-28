import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState, useEffect } from 'react'
import productData from '../../assets/fake-data/products'
import Helmet from './components/Helmet';
import ProductCard from './components/ProductCard';
import ProductView from './components/ProductView';
import IProduct from '../../interface/Product';
import { fetchProductDetail } from '../../api/CustomerAPI';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './components/Arrow';
import { getSimilarProducts } from '../../api/recommenderAPI';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const [recProduct, setRecProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProductDetail({
      slug: {
        equals: slug
      }
    }).then((data) => {
      console.log(data.data[0])
      setProduct(data.data[0]);
      data.data[0] && getSimilarProducts(data.data[0].id).then(({ data }) => {
        console.log(data)
        setRecProduct(data)
      }).catch((err) => {
        console.log(err)
        ErrorAlert('Xảy ra lỗi khi lấy sản phẩm tương tự!')
      })
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [slug])

  return (
    <Helmet title={product ? product.name : ""}>
      <Space style={{ paddingRight: '3%' }}>
        <ProductView id={product ? product.id : 1} />
      </Space>
      <Space direction='vertical' style={{ width: '100%', margin: '0 20px', paddingRight: '3%' }}>
        <Title level={2} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>CÓ THỂ BẠN SẼ THÍCH</Title>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={null}>
          {recProduct.map((item: IProduct, index: number) => (
            <ProductCard
              id={index}
              key={index}
              img01={item.image[0]}
              img02={item.image[1]}
              name={item.name}
              slug={item.slug}
              price={Number(item.price)}
              discount={null}
            />
          ))}
        </ScrollMenu>
      </Space>
    </Helmet>
  )
}

export default Product

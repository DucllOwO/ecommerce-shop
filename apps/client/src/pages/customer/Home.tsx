import { Carousel, Col, Image, Row, Space } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import policy from '../../assets/fake-data/policy'
import productData from '../../assets/fake-data/products'

import Helmet from './components/Helmet'
import PolicyCard from './components/PolicyCard'
import ProductCard from './components/ProductCard'

import slider_1 from '../../assets/images/slider/slide_1.png'
import slider_2 from '../../assets/images/slider/slider_2.png'
import slider_3 from '../../assets/images/slider/slider_3.png'
import best_seller_picture from '../../assets/images/slider/home_preivew_sanpham_7_image_desktop.jpg'
import new_product_picture from '../../assets/images/home_preivew_sanpham_3_image_desktop.jpg'
import banner from '../../assets/images/banner.png'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './components/Arrow'
import Title from 'antd/es/typography/Title'
import Scrollbars from 'react-custom-scrollbars'
import { AppContext } from '../../context/AppContext'

const Home = () => {
    const appContext = useContext(AppContext);


    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            <Carousel>
                <Image src={slider_1} preview={false} />
                <Image src={slider_2} preview={false} />
                <Image src={slider_3} preview={false} />
            </Carousel>
            {/* end hero slider */}

            {/* banner */}
            <Space>
                <Link to="/catalog">
                    <Image src={banner} alt="" preview={false} />
                </Link>
            </Space>
            {/* end banner */}

            {/* policy section */}
            <div style={{ margin: '20px 0' }} >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ margin: 0 }}>
                    {
                        policy.map((item, index) =>
                            <Col span={5} style={{ padding: 0 }} offset={1}>
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Col>)
                    }
                </Row>
            </div>
            {/* end policy section */}

            <Space direction='vertical' style={{ padding: "0 20px", width: '100%' }} >
                {/* best selling section */}
                <Title level={2} style={{ color: 'var(--main-color)' }}>BÁN CHẠY NHẤT</Title>
                <Row>
                    <Col span={4}> <Image src={best_seller_picture} preview={false} /></Col>
                    <Col span={20}>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={null}>
                            {productData.getProducts(8).map((item, index) => (
                                <ProductCard
                                    id={index}
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))}
                        </ScrollMenu>
                    </Col>
                </Row>
                {/* end best selling section */}

                <Title level={2} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>HÀNG MỚI VỀ</Title>
                {/* new arrival section */}
                <Row>
                    <Col span={4}> <Image src={new_product_picture} preview={false} /></Col>
                    <Col span={20}>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={null} >
                            {productData.getProducts(8).map((item, index) => (
                                <ProductCard
                                    id={index}
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))}
                        </ScrollMenu>
                    </Col>
                </Row>
                {/* end new arrival section */}


            </Space>
        </Helmet>
    )
}

export default Home

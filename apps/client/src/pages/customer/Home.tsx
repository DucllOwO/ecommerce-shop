import { Carousel, Col, Divider, Image, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import policy from '../../assets/fake-data/policy'
import productData from '../../assets/fake-data/products'

import Helmet from './components/Helmet'
import PolicyCard from './components/PolicyCard'
import ProductCard from './components/ProductCard'

import slider_1 from '../../assets/images/slider/slide_1.png'
import slider_2 from '../../assets/images/slider/slider_2.png'
import slider_3 from '../../assets/images/slider/slider_3.png'
import Title from 'antd/es/typography/Title'

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            <Carousel>
                <Image src={slider_1} preview={false} />
                <Image src={slider_2} preview={false} />
                <Image src={slider_3} preview={false} />
            </Carousel>
            {/* end hero slider */}

            {/* policy section */}
            <div style={{ width: "100%", margin: '20px 0' }} >
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

            <Space direction='vertical' style={{ padding: "0 20px" }} >
                {/* best selling section */}
                <Title style={{ textAlign: "center" }} level={2}>Duckkkk</Title>
                <Space>
                    {
                        productData.getProducts(4).map((item, index) => (
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
                {/* end best selling section */}

                {/* new arrival section */}
                <Space wrap={true}>
                    {
                        productData.getProducts(8).map((item, index) => (
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
                {/* end new arrival section */}

                {/* banner */}
                <Space>
                    <Link to="/catalog">
                        <img src={'../../assets/images/banner.png'} alt="" />
                    </Link>
                </Space>
                {/* end banner */}
            </Space>
        </Helmet>
    )
}

export default Home

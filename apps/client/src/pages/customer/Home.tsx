import { Carousel, Col, Image, Row, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import policy from '../../assets/fake-data/policy'

import Helmet from './components/Helmet'
import PolicyCard from './components/PolicyCard'
import ProductCard from './components/ProductCard'

import slider_1 from '../../assets/images/slider/slide_1.png'
import slider_2 from '../../assets/images/slider/slider_2.png'
import slider_3 from '../../assets/images/slider/slider_3.png'
import banner from '../../assets/images/banner.png'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './components/Arrow'
import Title from 'antd/es/typography/Title'
import { AppContext } from '../../context/AppContext'
import IProduct from '../../interface/Product'
import { fetchTopTenBestSellers, fetchTopTenMostViewed } from '../../api/productAPI'
import '../../index.css';

const Home = () => {
    const appContext = useContext(AppContext);
    const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
    const [mostViewed, setMostViewed] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            const bestSellersAPI = fetchTopTenBestSellers();
            const mostViewedAPI = fetchTopTenMostViewed();

            await Promise.all([bestSellersAPI, mostViewedAPI]).then((values) => {
                setBestSellers(values[0].data);
                setMostViewed(values[1].data);
            }).catch((err) => {
                console.log("🚀 ~ file: Home.tsx:32 ~ awaitPromise.all ~ err:", err)
            })
        }

        fetchTopProducts();
    })

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
                    <Col span={24}>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={null}>
                            {bestSellers.map((item, index) => (
                                <ProductCard
                                    id={index}
                                    key={index}
                                    img01={item.image[0]}
                                    img02={item.image[1]}
                                    name={item.name}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                    discount={item.discount?.discount ? item.discount?.discount : null}
                                />
                            ))}
                        </ScrollMenu>
                    </Col>
                </Row>
                {/* end best selling section */}

                <Title level={2} style={{ color: 'var(--main-color)', margin: '20px 0 10px 0' }}>XEM NHIỀU NHẤT</Title>
                {/* new arrival section */}
                <Row>
                    <Col span={24} style={{ overflowX: 'hidden' }}>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} Footer={null} >
                            {mostViewed.map((item, index) => (
                                <ProductCard
                                    id={index}
                                    key={index}
                                    img01={item.image[0]}
                                    img02={item.image[1]}
                                    name={item.name}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                    discount={item.discount?.discount ? item.discount?.discount : null}
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

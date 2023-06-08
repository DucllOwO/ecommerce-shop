import React from 'react'
import { Col, Grid, Row } from 'antd'

import { Link } from 'react-router-dom'

import logo from '../../../assets/images/Logo-2.png'

const footerAboutLinks = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/about"
    },
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/return-policy"
    }
]
const FooterCustom = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={6}>
                        <div>
                            <div className="footer__title">
                                Tổng đài hỗ trợ
                            </div>
                            <div className="footer__content">
                                <p>
                                    Liên hệ đặt hàng <strong>0123456789</strong>
                                </p>
                                <p>
                                    Thắc mắc đơn hàng <strong>0123456789</strong>
                                </p>
                                <p>
                                    Góp ý, khiếu nại <strong>0123456789</strong>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>
                            <div className="footer__title">
                                Về Yolo
                            </div>
                            <div className="footer__content">
                                {
                                    footerAboutLinks.map((item, index) => (
                                        <p key={index}>
                                            <Link to={item.path}>
                                                {item.display}
                                            </Link>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>
                            <div className="footer__title">
                                Chăm sóc khách hàng
                            </div>
                            <div className="footer__content">
                                {
                                    footerCustomerLinks.map((item, index) => (
                                        <p key={index}>
                                            <Link to={item.path}>
                                                {item.display}
                                            </Link>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="footer__about">
                            <p>
                                <Link to="/">
                                    <img src={logo} className="footer__logo" alt="" />
                                </Link>
                            </p>
                            <p>
                                Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng Việt. Hãy cùng Yolo hướng đến một cuộc sống năng động, tích cực hơn.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default FooterCustom

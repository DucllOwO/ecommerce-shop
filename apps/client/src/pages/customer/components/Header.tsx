import { ShoppingCartOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import Search from 'antd/es/input/Search'
import React, { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../../assets/images/Logo-2.png'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Phụ kiện",
        path: "/accessories"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link to='login'>
                Đăng nhập
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to='signup'>
                Đăng ký
            </Link>
        ),
    }
]

const HeaderCustom = () => {

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)

    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    //             headerRef.current.classList.add('shrink')
    //         } else {
    //             headerRef.current.classList.remove('shrink')
    //         }
    //     })
    //     return () => {
    //         window.removeEventListener("scroll")
    //     };
    // }, []);

    const menuLeft = useRef(null)

    // const menuToggle = () => menuLeft.current.classList.toggle('active')

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle">
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        {/* <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div> */}
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">

                            <Search
                                placeholder="input search text"
                                allowClear
                                style={{ width: 200, fontWeight: '700' }}
                            />

                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <ShoppingCartOutlined />
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Dropdown menu={{ items }} placement='bottom'><UserOutlined /></Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCustom

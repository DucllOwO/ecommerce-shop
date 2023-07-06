import { ShoppingCartOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { AutoComplete, Dropdown, Input, MenuProps } from 'antd'
import Search from 'antd/es/input/Search'
import React, { useRef, useEffect, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { searchProductByName } from '../../../api/productAPI'

import logo from '../../../assets/images/Logo-2.png'
import { AppContext } from '../../../context/AppContext'
import LocalStorage from '../../../helper/localStorage'
import IProduct from '../../../interface/Product'
import SearchOption from './SearchOption'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
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
    const [searchText, setSearchText] = useState('');
    const [searchOptions, setSearchOptions] = useState<IProduct[]>([])
    const nav = useNavigate();

    useEffect(() => {
        const fetchProducts = setTimeout(() => {
            if (searchText.length > 0)
                searchProductByName(searchText).then((productsRes) => setSearchOptions(productsRes.data.map((product: IProduct) => ({ value: product.slug, label: <SearchOption imgSrc={product.image[0]} name={product.name} /> }))))
        }, 1000)

        return () => {
            clearTimeout(fetchProducts)
        }
    }, [searchText])


    const headerRef = useRef(null)

    const menuLeft = useRef(null)

    const appCtx = useContext(AppContext);

    const itemsLogined: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to='profile'>
                    Thông tin
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={'orders'}>
                    Danh sách đơn hàng
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to={''} onClick={() => {
                    appCtx?.setUser(null);
                    LocalStorage.deleteItem('access_token');
                    LocalStorage.deleteItem('user');
                }}>
                    Đăng xuất
                </Link>
            ),
        }
    ]

    const onSearch = (value: string) => {
        setSearchText(value)
    }

    const onSelect = (value: string) => {
        setSearchText('');
        setSearchOptions([])
        nav(`/product/${value}`)
    };

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="header__menu">
                    <div className="header__menu__left" ref={menuLeft}>
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
                            <AutoComplete
                                dropdownMatchSelectWidth={252}
                                style={{ width: "90%" }}
                                options={searchOptions}
                                onSelect={onSelect}
                                onSearch={onSearch}
                                value={searchText}
                            >
                                <Input.Search size="middle" placeholder="Tìm kiếm sản phẩm" enterButton />
                            </AutoComplete>

                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="cart">
                                <ShoppingCartOutlined />
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Dropdown menu={appCtx?.user ? { items: itemsLogined } : { items }} placement='bottom'><UserOutlined /></Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCustom

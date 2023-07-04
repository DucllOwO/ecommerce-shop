import React from 'react'
import DashboardIcon from '../assets/menu/dashboard-icon.png'
import OrderIcon from '../assets/menu/box_96px.png'
import ProductIcon from '../assets/menu/t-shirt_96px.png'
import InformationIcon from '../assets/menu/user_96px.png'
import DeliveryIcon from '../assets/menu/in_transit_96px.png'
import ReivewIcon from '../assets/menu/good_quality_96px.png'
import ReceiptIcon from '../assets/menu/receipt_96px.png'
import PolicyIcon from '../assets/menu/terms_and_conditions_96px.png'
import DiscountIcon from '../assets/icon/loyalty_card_96px.png'
import VoucherIcon from '../assets/icon/sale_96px.png'
import InventoryIcon from '../assets/menu/warehouse_96px.png'
import type { MenuProps } from 'antd/es/menu'
import { Image, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

const generateImageIcon = (path: string) => {
  return <div className='centerflex'>
    <Image src={path} width={25} height={25} preview={false} />
  </div>
}

const menu: MenuProps['items'] = [
  {
    key: 'dashboard',
    label: 'Thống kê',
    icon: generateImageIcon(DashboardIcon)
  },
  {
    key: 'order',
    label: 'Đơn hàng',
    icon: generateImageIcon(OrderIcon),
    children: [
      {
        key: 'order/waiting',
        label: 'Đang chờ',

      },
      {
        key: 'order/completed',
        label: 'Hoàn thành',
      },
      {
        key: 'order/canceled',
        label: 'Đã huỷ',
      }
    ]

  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: generateImageIcon(ProductIcon),
    children: [
      {
        key: 'product/tag',
        label: 'Nhãn',
        title: 'Nhãn để gắn cho sản phẩm: quần, áo, màu sắc,...'
      },
      {
        key: 'product/collection',
        label: 'Bộ sưu tập'
      },
      {
        key: 'product/',
        label: 'Sản phẩm'
      }
    ]
  },
  {
    key: 'delivery',
    icon: generateImageIcon(DeliveryIcon),
    label: 'Tình trạng đơn hàng',
  }
  ,
  {
    key: 'receipt',
    label: 'Hóa đơn',
    icon: generateImageIcon(ReceiptIcon),
    children: [
      {
        key: 'receipt/paid',
        label: 'Đã thanh toán'
      },
      {
        key: 'receipt/unpaid',
        label: 'Chưa thanh toán'
      }
    ]
  },
  // {
  //   key: 'feedback',
  //   label: 'Đánh giá',
  //   icon: generateImageIcon(ReivewIcon)
  // },
  {
    key: 'discount',
    label: 'Giảm giá',
    icon: generateImageIcon(DiscountIcon)
  },
  {
    key: 'voucher',
    label: 'Voucher',
    icon: generateImageIcon(VoucherIcon)
  },
  {
    key: 'policy',
    label: 'Chính sách',
    icon: generateImageIcon(PolicyIcon)
  },
  {
    key: 'customer-management',
    label: 'Khách hàng',
    icon: generateImageIcon(InformationIcon)
  },
  {
    key: 'importing',
    label: 'Nhập hàng',
    icon: generateImageIcon(InventoryIcon),
    children: [
      {
        key: 'importing/list',
        label: 'Lịch sử nhập hàng'
      },
      {
        key: 'importing/import',
        label: 'Nhập hàng'
      }
    ]
  }
]

const AdminMenu = () => {
  const navigate = useNavigate();

  const onClickHandler: MenuProps['onClick'] = (e) => {
    if (e.key === "/login") {
      navigate("/");
    } else {
      navigate(e.key);
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={menu}
      onClick={onClickHandler}
    />
  )
}

export default AdminMenu
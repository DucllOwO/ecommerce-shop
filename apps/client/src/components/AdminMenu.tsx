import React from 'react'
import DashboardIcon from '../assets/menu/dashboard-icon.png'
import OrderIcon from '../assets/menu/box_96px.png'
import ProductIcon from '../assets/menu/t-shirt_96px.png'
import InformationIcon from '../assets/menu/user_96px.png'
import DeliveryIcon from '../assets/menu/in_transit_96px.png'
import ReivewIcon from '../assets/menu/good_quality_96px.png'
import ReceiptIcon from '../assets/menu/receipt_96px.png'
import PolicyIcon from '../assets/menu/terms_and_conditions_96px.png'
import type { MenuProps } from 'antd/es/menu'
import { Image, Menu } from 'antd'

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
        key: 'waiting',
        label: 'Đang chờ',

      },
      {
        key: 'completed',
        label: 'Hoàn thành',
      }
    ]

  },
  {
    key: 'product',
    label: 'Sản phẩm',
    icon: generateImageIcon(ProductIcon),
    children: [
      {
        key: 'category',
        label: 'Loại sản phẩm',
      },
      {
        key: 'collection',
        label: 'Bộ sưu tập'
      },
      {
        key: 'product-child',
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
        key: 'paid',
        label: 'Đã thanh toán'
      },
      {
        key: 'unpaid',
        label: 'Chưa thanh toán'
      }
    ]
  },
  {
    key: 'feedback',
    label: 'Đánh giá',
    icon: generateImageIcon(ReivewIcon)
  }
  ,
  {
    key: 'policy',
    label: 'Chính sách',
    icon: generateImageIcon(PolicyIcon)
  }
  ,
  {
    key: 'information',
    label: 'Thông tin',
    icon: generateImageIcon(InformationIcon)
  }
]

const AdminMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={menu}
    />
  )
}

export default AdminMenu
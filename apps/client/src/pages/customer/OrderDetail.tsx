import { LeftOutlined } from '@ant-design/icons'
import { Button, Card, Descriptions, Divider, Space, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import ProductOrderDetailTable from '../../components/Table/Product/ProductDetailTable.Order'
import { useNavigate, useParams } from 'react-router-dom';
import OrderDetailCard from './components/OrderDetailCard'

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Space className='svgBg' style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction='vertical' style={{ width: '70vw', margin: '20px 0px' }}>
        <OrderDetailCard />
      </Space>
    </Space>
  )
}

export default OrderDetail
import { LeftOutlined } from '@ant-design/icons'
import { Button, Card, Descriptions, Divider, Space, Spin, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import ProductOrderDetailTable from '../../components/Table/Product/ProductDetailTable.Order'
import { useNavigate, useParams } from 'react-router-dom';
import OrderDetailCard from './components/OrderDetailCard'
import { getOrder } from '../../api/CustomerAPI'
import IOrder from '../../interface/Order'

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<IOrder>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id)
      getOrder(id).then((data) => {
        console.log(data)
        setData(data.data);
      }).finally(() => setLoading(false))
  }, []);

  return (
    <Spin spinning={loading}>
      <Space className='svgBg' style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Space direction='vertical' style={{ width: '70vw', margin: '20px 0px' }}>
          <OrderDetailCard data={data} />
        </Space>
      </Space>
    </Spin>
  )
}

export default OrderDetail
import { Space, List, Row, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import IOrder from '../../interface/Order';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getOrdersByUserID } from '../../api/CustomerAPI';
import LocalStorage from '../../helper/localStorage';
import { formatNumberWithComma } from '../../helper/utils';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Order = () => {
  const [data, setData] = useState<IOrder[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getOrdersByUserID(LocalStorage.getItem('user').id).then((data) => {
      console.log(data.data)
      setData(data.data)
    })
  }, [])

  return (
    <Space className='svgBg' style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction='vertical' style={{ gap: 20, margin: '20px 0px' }}>
        {data?.map((item, i) => <List
          bordered
          header={<Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Title level={2}>Đơn hàng {i + 1}</Title>
            <Button type='primary' onClick={() => navigate(`/orders/${item.id}`)}>Xem chi tiết</Button>
          </Space>}
          footer={<Title level={4} style={{ textAlign: 'end' }}> Tổng giá trị: {formatNumberWithComma(item.total_cost)}</Title>}
          style={{ width: '60vw', background: 'white' }}
          itemLayout="vertical"
          size="default"
          dataSource={item.Order_detail}
          renderItem={(detail) => (
            <List.Item
              key={detail.product_item.product.name}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={detail.product_item.product.image[0]}
                />
              }
            >
              <List.Item.Meta
                title={detail.product_item.product.name}
              />
              <Row>
                {`Số lượng: ${detail?.quantity}`}
              </Row>
              <Row>{`${detail.product_item.color} ${detail.product_item.size}`}</Row>
              <Row>{formatNumberWithComma(detail.product_item.product.price)}</Row>
            </List.Item>
          )}
        />)}

      </Space>
    </Space>
  )
}

export default Order
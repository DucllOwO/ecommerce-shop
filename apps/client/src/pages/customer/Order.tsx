import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Space, List, Avatar, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react'

const data = Array.from({ length: 5 }).map((_, i) => ({
  title: `Tên quần áo ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Order = () => {
  return (
    <Space className='svgBg' style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction='vertical' style={{ gap: 20, margin: '20px 0px' }}>
        <List
          bordered
          header={<Title level={2}>Đơn hàng 1</Title>}
          footer={<Title level={4} style={{ textAlign: 'end' }}> Tổng giá trị: 900000000</Title>}
          style={{ width: '60vw', background: 'white' }}
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={item.title}
              />
              <Row>
                x 1
              </Row>
              <Row>Đen / XL</Row>
              <Row>99.000 đ</Row>
            </List.Item>
          )}
        />
        <List
          bordered
          header={<Title level={2}>Đơn hàng 1</Title>}
          footer={<Title level={4} style={{ textAlign: 'end' }}> Tổng giá trị: 900000000</Title>}
          style={{ width: '60vw', background: 'white' }}
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={item.title}
              />
              <Row>
                x 1
              </Row>
              <Row>Đen / XL</Row>
              <Row>99.000 đ</Row>
            </List.Item>
          )}
        />
        <List
          bordered
          header={<Title level={2}>Đơn hàng 1</Title>}
          footer={<Title level={4} style={{ textAlign: 'end' }}> Tổng giá trị: 900000000</Title>}
          style={{ width: '60vw', background: 'white' }}
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={item.title}
              />
              <Row>
                x 1
              </Row>
              <Row>Đen / XL</Row>
              <Row>99.000 đ</Row>
            </List.Item>
          )}
        />
        <List
          bordered
          header={<Title level={2}>Đơn hàng 1</Title>}
          footer={<Title level={4} style={{ textAlign: 'end' }}> Tổng giá trị: 900000000</Title>}
          style={{ width: '60vw', background: 'white' }}
          itemLayout="vertical"
          size="default"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={item.title}
              />
              <Row>
                x 1
              </Row>
              <Row>Đen / XL</Row>
              <Row>99.000 đ</Row>
            </List.Item>
          )}
        />
      </Space>
    </Space>
  )
}

export default Order
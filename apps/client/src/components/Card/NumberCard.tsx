import React from 'react'
import { Card, Avatar } from 'antd'

const { Meta } = Card;

const NumberCard = ({ icon = '', title = '', description = '' }) => {
  return (
    <Card
      hoverable>
      <Meta
        avatar={<Avatar src={icon} />}
        title={title}
        description={description}
      />
    </Card>
  )
}

export default NumberCard
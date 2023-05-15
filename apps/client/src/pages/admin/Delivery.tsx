import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

const Delivery = () => {
  // different only status
  return (
    <div>
      <OrderTable state='waiting' />
    </div>
  )
}

export default Delivery
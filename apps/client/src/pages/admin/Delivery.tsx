import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

const Delivery = () => {
  // different only status
  return (
    <div>
      <OrderTable state='delivery' />
    </div>
  )
}

export default Delivery
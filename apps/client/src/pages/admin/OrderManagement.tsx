import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

interface OrderProps {
  state: string
}

const OrderManagement = ({ state }: OrderProps) => {

  return (
    <div>
      <OrderTable state={state} />
    </div>
  )
}

export default OrderManagement
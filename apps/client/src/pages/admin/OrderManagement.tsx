import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

interface OrderProps {
  state: string
}

const OrderManagement = ({ state }: OrderProps) => {
  console.log(state)
  return (
    <div>
      <OrderTable />
    </div>
  )
}

export default OrderManagement
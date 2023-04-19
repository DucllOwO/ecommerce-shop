import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

interface OrderProps {
  state: string
}

const Order = ({ state }: OrderProps) => {
  console.log(state)
  return (
    <div>
      <OrderTable />
    </div>
  )
}

export default Order
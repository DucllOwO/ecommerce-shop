import React from 'react'
import OrderTable from '../../components/Table/Order/OrderTable'

interface OrderProps {
  state: string
}

const Order = ({ state }: OrderProps) => {
  // console.log(state)
  return (
    <div>
      <OrderTable state={state}/>
    </div>
  )
}

export default Order
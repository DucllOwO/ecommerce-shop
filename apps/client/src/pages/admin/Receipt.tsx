import React from 'react'
import ReceiptTable from '../../components/Table/Receipt/ReceiptTable'

interface ReceiptProps {
  state: string
}

const Receipt = ({ state }: ReceiptProps) => {
  return (
    <ReceiptTable state={state}/>
  )
}

export default Receipt
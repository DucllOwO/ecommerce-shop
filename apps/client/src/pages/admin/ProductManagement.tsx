import React from 'react'
import ProductTable from '../../components/Table/Product/ProductTable'

interface ProductManagementProps {
}

const ProductManagement = ({ }: ProductManagementProps) => {
  return (
    <div style={{ height: 1000 }}>
      <ProductTable />
    </div>
  )
}

export default ProductManagement
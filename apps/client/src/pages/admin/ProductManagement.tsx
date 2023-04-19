import React from 'react'
import ProductTable from '../../components/Table/Product/ProductTable'

interface ProductManagementProps {
}

const ProductManagement = ({ }: ProductManagementProps) => {
  return (
    <div>
      <ProductTable />
    </div>
  )
}

export default ProductManagement
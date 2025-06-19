import React from 'react'
import ShopProductList from './ShopProductList'

export default function ShopProducts({products}) {

  return (
    <div className='mb-3'>
      {products && products.length === 0 && <h3 className='text-center text-secondary mt-5'>No products available.</h3>}
      <ShopProductList products={products}/>
    </div>
  )
}

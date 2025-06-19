import React from 'react'
import PageHeader from '../components/layout/PageHeader'
import OrdersContent from '../components/order/OrdersContent'

const Order = () => {
  return (
    <div>
      <PageHeader text="Order" />
      <div className="div">
        <OrdersContent/>
      </div>
    </div>
  )
}

export default Order
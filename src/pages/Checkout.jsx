import React from 'react'
import PageHeader from '../components/layout/PageHeader'
import CheckoutContent from '../components/checkout/CheckoutContent'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const isLoggedIn = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate()

  if(!isLoggedIn) {
    navigate("/login");
  }

  return (
    <div>
      <PageHeader text='Checkout' />
      <CheckoutContent />
    </div>
  )
}

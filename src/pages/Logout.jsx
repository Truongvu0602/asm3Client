import React from 'react'
import { redirect } from 'react-router-dom'

export default function Logout() {
  return (
    <></>
  )
}

export const action = () => {

  localStorage.removeItem('loggedUser');

  return redirect('/');
}


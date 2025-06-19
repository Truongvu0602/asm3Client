import React from 'react'
import UserSignup from '../components/user/UserSignup'
import { redirect } from 'react-router-dom';

export default function Register() {
  return (
    <div>
      <UserSignup />
    </div>
  )
}

export const action = async ({request}) => {

  const data = await request.formData();

  const name = data.get('name');
  const email = data.get('email');
  const password = data.get('password');
  const phone = data.get('phone');

  const newUser = {
    name,
    email,
    password,
    phone
  }

  const userArr = JSON.parse(localStorage.getItem('userArr')) || [];

  userArr.push(newUser);
  console.log(newUser)

  localStorage.setItem('userArr', JSON.stringify(userArr));

  return redirect('/login');
}

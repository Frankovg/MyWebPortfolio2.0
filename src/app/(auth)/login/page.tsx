import React from 'react'

import AuthForm from './components/auth-form'
import { GoHome } from './components/go-home'

export const dynamic = 'force-dynamic';

const Login = () => {
  return (
    <>
      <AuthForm />
      <GoHome />
    </>
  )
}

export default Login

import React from 'react'
import BaseLayout from './BaseLayout'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <>
        <BaseLayout>
                <main>
                  <LoginForm />  
                </main>      
        </BaseLayout>
    </>
  )
}

export default LoginPage
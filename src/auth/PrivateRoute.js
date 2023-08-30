import React from 'react'
import { isLoggedIn } from '.'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateRoute
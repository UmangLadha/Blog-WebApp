import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
	const isLoggedIn = useSelector(state=>state.auth.isLoggedIn) 
	const user = isLoggedIn;
  return user ? <Outlet/> : <Navigate to= "/login" />
}

export default ProtectedRoutes
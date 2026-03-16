import { useAppSelector } from "../redux/app/hooks/hooks"
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
	const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn) 
	
	const user = isLoggedIn;
  return user ? <Outlet/> : <Navigate to= "/login" />
}

export default ProtectedRoutes
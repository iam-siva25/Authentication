import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'


// this act as guards for private pages
const ProtectedRoute = ()=>{
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated){
    return <Navigate to="/login"/>
    return <Outlet/>
  }
}

export default ProtectedRoute;
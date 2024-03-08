import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UnPrivateRoute = () => {
    return sessionStorage.getItem("token")        
    ? <Navigate  to='/home' />
    : <Outlet/>
}

export default UnPrivateRoute;
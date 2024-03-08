import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LogOutPrivateRoute = () => {
    return sessionStorage.getItem("token")        
    ? <Outlet/>
    : <Navigate  to='/' />
}

export default LogOutPrivateRoute;
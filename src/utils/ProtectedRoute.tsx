import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps{
    redirectPath?:string 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {

    if (!localStorage.getItem("jwt")) {
        
        return <Navigate to={redirectPath} replace={true} />;
    }

    return <Outlet />;
};
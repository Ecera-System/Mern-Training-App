import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('auth_token');


    if (!token) {
        localStorage.removeItem('auth_token');
        return <Navigate to="/sign-in" state={{ from: location }} replace />
    };

    return children;
}

export default RequireAuth;
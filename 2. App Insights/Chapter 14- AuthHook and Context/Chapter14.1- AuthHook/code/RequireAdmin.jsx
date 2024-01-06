import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useGetUser from '../API/useGetUser';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const RequireAdmin = ({ children }) => {
    const [userData, loading] = useGetUser();
    const location = useLocation();

    if (loading) {
        return <Spinner />
    };

    if (userData?.role !== 'admin') {
        localStorage.removeItem('auth_token');
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAdmin;
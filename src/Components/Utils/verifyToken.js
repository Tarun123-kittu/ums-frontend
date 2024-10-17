import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element: Component }) => {
    const token = localStorage.getItem('ums_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        jwtDecode(token);
    } catch (error) {
        localStorage.removeItem('jwtToken');
        return <Navigate to="/" />;
    }

    return <Component />;
};

export default ProtectedRoute;

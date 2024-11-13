import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element: Component }) => {
    const token = localStorage.getItem('ums_token');
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const userData = jwtDecode(token);
        if(userData){
            localStorage.setItem("email",userData.email)
            localStorage.setItem("hours",userData.working_schedule)
            localStorage.setItem("name",userData.username)
        }
    } catch (error) {
        localStorage.removeItem('jwtToken');
        return <Navigate to="/" />;
    }

    return <Component />;
};

export default ProtectedRoute;

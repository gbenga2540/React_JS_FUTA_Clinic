import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: any;
    isAuthenticated: boolean;
}
const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
    let location = useLocation();

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default ProtectedRoute;

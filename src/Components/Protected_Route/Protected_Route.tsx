import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: any;
    isAuthenticated: boolean;
}
const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
    let location = useLocation();
    const user_info = localStorage.getItem(
        process.env.REACT_APP_USER_INFO as string,
    );
    if (
        user_info === undefined ||
        user_info === null ||
        user_info === 'undefined' ||
        user_info === 'null'
    ) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
        try {
            const token = JSON.parse(user_info || '{}')?.token;
            if (token) {
                return children;
            } else {
                return (
                    <Navigate to="/login" state={{ from: location }} replace />
                );
            }
        } catch (error) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }
};

export default ProtectedRoute;

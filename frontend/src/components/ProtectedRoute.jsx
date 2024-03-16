// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Element, isAuthenticated, redirectTo, ...rest }) => {
//   return isAuthenticated ? <Route {...rest} element={<Element />} /> : <Navigate to={redirectTo} replace />
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;
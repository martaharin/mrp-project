// src/components/ProtectedRoute.jsx
import successHandler from '@/request/successHandler';
import { Button, message, Result } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, entity }) => {
  const storedUser = localStorage.getItem('user'); // assuming you store full user info
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    successHandler(
      {
        status: 417,
        data: {
          message: 'Access denied due to invalid credentials or insufficient permissions.',
        },
      },
      {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      }
    );
    return (
      <>
        <Result
          status="403"
          title="403 - Unauthorized"
          subTitle="You do not have permission to access this page."
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          }
        />
        {/* <Navigate to={'/' + entity} replace />; */}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;

import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { Login, Register } from '../pages';
import { AuthContext } from '../store/contexts/AuthContext';

export const AllRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log(isAuthenticated);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route index element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <></>
      </Routes>
    </>
  );
};

// File: /client/src/components/RequireAuth.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const RequireAuth: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const location = useLocation();
  console.log("token", token);

  if (!token) {
    // Redirect to login page while preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default RequireAuth;

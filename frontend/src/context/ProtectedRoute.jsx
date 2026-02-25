import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./Context";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.isAdmin === false) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
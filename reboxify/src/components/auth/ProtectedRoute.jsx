import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Loader from "@components/common/Loader";

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (requireAuth && !currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requireAuth && currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

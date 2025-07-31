import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./layout/Spinner";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useUser();
  if (loading) return <Spinner />;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;

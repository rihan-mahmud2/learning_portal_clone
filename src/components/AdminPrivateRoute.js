import React from "react";
import { useAdmin } from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

function AdminPrivateRoute({ children }) {
  const isAdmin = useAdmin("admin");
  return isAdmin ? children : <Navigate to="/admin" />;
}

export default AdminPrivateRoute;

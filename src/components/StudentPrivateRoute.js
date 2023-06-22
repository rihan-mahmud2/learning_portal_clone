import React from "react";
import { useAdmin } from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

function StudentPrivateRoute({ children }) {
  const isStudent = useAdmin("student");
  return isStudent ? children : <Navigate to="/" />;
}

export default StudentPrivateRoute;

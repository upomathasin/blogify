import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { auth } = useAuth();

  return (
    <div>
      {auth.user ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}
    </div>
  );
}

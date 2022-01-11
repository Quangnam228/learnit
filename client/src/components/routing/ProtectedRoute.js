import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate, Outlet } from "react-router-dom";
import NavbarMenu from "../Layout/NavbarMenu";

function ProtectedRoute() {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;

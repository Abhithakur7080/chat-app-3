import React, { useState } from "react";
import Form from "./pages/Form/Form";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const ProtectedRoute = ({ children, auth = false }) => {
    const isloggedIn = localStorage.getItem("user-token") !== null || false;
    if (!isloggedIn && auth) {
      return <Navigate to={"/user/signin"} />;
    } else if (
      isloggedIn &&
      ["/user/signin", "/user/signup"].includes(window.location.pathname)
    ) {
      console.log("object :>>");
      return <Navigate to={"/"} />;
    }
    return children
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/signin"
        element={
          <ProtectedRoute>
            <Form isSignIn={true} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/signup"
        element={
          <ProtectedRoute>
            <Form isSignIn={false} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;

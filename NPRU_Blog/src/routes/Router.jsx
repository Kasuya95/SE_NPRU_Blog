import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Post from "../pages/Postdetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "create", element: <Create /> },
      { path: "edit/:id", element: <Edit /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "post/:id", element: <Post /> },
    ],
  },
]);

export default router;

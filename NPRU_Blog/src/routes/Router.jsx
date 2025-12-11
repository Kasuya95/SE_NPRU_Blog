import React from "react";
import { createBrowserRouter } from "react-router";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Post from "../pages/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
]);

export default router;

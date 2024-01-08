import PrivateRoute from "./PrivateRoute";
import { PAGE } from './../components/constants';
import HomePage from './../pages/HomePage';
import SignIn from "components/login/SignIn";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SpacePage from "pages/Space";

const route = createBrowserRouter([
  {
    path: PAGE.LOGIN.path,
    element: <SignIn />,
  },
  {
    path: "/",
    element: <PrivateRoute/>,
    children: [{ path: PAGE.HOME.path, element: <HomePage /> }],
  },
  {
    path:PAGE.SPACE.path,
    element:<SpacePage/>
  }
]);

export default route;

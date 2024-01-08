import PrivateRoute from "./PrivateRoute";
import { PAGE } from './../components/constants';
import HomePage from './../pages/HomePage';
import SignIn from "components/login/SignIn";
import React from "react";
import { createBrowserRouter } from "../../node_modules/react-router-dom/dist/index";

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
]);

export default route;

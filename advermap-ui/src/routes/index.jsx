import PrivateRoute from "./PrivateRoute";

import SignIn from "components/login/SignIn";
import React from "react";
import {createBrowserRouter} from "react-router-dom";
import SpacePage from "pages/Space/SpacePage";
import ErrorPage from "pages/Error/ErrorPage";
import {PAGE} from "components/constants";
import HomePage from "pages/HomePage";
import LoadingPage from "pages/Loading/LoadingPage";
import SurfacePage from "pages/Surface/SurfacePage";
import ReportPage from "pages/Report/ReportPage";
import ReportDetail from "pages/Report/ReportDetail";

const privateRoute = [
    {path: PAGE.HOME.path, element: <HomePage/>},
    {
        path: PAGE.SPACE.path,
        element: <SpacePage/>,
    },
    {
        path: PAGE.SPACE.path + "/:id",
        element: <SurfacePage/>,
    },
    {
        path: PAGE.SURFACE.path + "/:id",
        element: <ReportPage/>,
    },
    {
        path: PAGE.REPORT.path + "/:id",
        element: <ReportDetail/>,
    },
    {
        path: "/test",
        element: <LoadingPage/>,
    },
    {
        path: "*",
        element: <ErrorPage/>,
    },
];

const route = createBrowserRouter([
    {
        path: PAGE.LOGIN.path,
        element: <SignIn/>,
    },
    {
        path: "/",
        element: <PrivateRoute/>,
        children: privateRoute,
    },
]);

export default route;

import PrivateRoute from "./PrivateRoute";

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
import SignIn from "pages/login/SignIn";
import ForgotPassword from "pages/login/ForgotPassword";
import OtpConfirmInput from "pages/login/InputOtp";
import ResetPassword from "pages/login/ResetPassword";
import SpaceRequestPage from "pages/SpaceRequest/SpaceRequestPage";
import MyProfilePage from "pages/MyProfile";

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
        path: PAGE.SURFACE.path,
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
        path: PAGE.REPORT.path,
        element: <ReportPage/>,
    },
    {
        path: PAGE.SPACE_REQUEST.path,
        element: <SpaceRequestPage/>,
    },
    {
        path: PAGE.PROFILE.path,
        element: <MyProfilePage/>,
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
        path: PAGE.FORGOT_PASSWORD.path,
        element: <ForgotPassword />,
    },
    {
        path: PAGE.OTP_INPUT.path,
        element: <OtpConfirmInput/>,
    },
    {
        path: PAGE.RESET_PASSWORD.path,
        element: <ResetPassword/>,
    },
    {
        path: "/",
        element: <PrivateRoute/>,
        children: privateRoute,
    },
]);

export default route;

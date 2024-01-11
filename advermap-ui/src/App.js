import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  Router,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import route from "./routes/index";
import LoadingPage from "pages/Loading/LoadingPage";
import BasicSnackbar from "components/Snackbar/BasicSnackbar";

function App() {
  // @ts-ignore
  const { loading, snackbar } = useSelector((state) => state.appState);

  return (
    <>
      {loading && <LoadingPage/>}

      <BasicSnackbar {...snackbar} />

      <RouterProvider router={route} />
    </>
  );
}

export default App;

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

import { ChakraProvider } from '@chakra-ui/react'
function App() {
  const isLoading = useSelector((state) => state.appState.loading);

  return (
    <>
      {isLoading && <LoadingPage />}
      <RouterProvider router={route} />
    </>
  );
}

export default App;

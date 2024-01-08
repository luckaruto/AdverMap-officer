import {
  BrowserRouter,
  createBrowserRouter, Navigate,
  Outlet,
  redirect,
  Router,
  RouterProvider,
  Routes,
  useNavigate
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import route from './routes/index';

function App() {

  return (
        <RouterProvider router={route}/>
  )

}

export default App;

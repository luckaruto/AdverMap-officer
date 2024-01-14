// @ts-nocheck
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PAGE } from "../components/constants";
import MiniDrawer from "../components/appbar/toolBar";
import {
  setCurrentPage,
  setLoading,
  setRefreshToken,
  setToken,
} from "../redux/appSlice";
import { AuthService } from "../services/auth/authService";

const PrivateRoute = () => {
  const { tokenPayload, refreshToken } = useSelector(
    (state) => state.appState
  );
  const isLoading = useSelector((state) => state.appState.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!tokenPayload || tokenPayload === null || tokenPayload === "") {
        if (refreshToken) {
          try {
            dispatch(setLoading(true));
            const res = await AuthService.refreshToken({
              headers: { "refresh-token": refreshToken },
            });
            console.log(res);
            if (res.status === "OK") {
              dispatch(setToken(res.data.token));
              dispatch(setRefreshToken(res.data.refreshToken));
            } else {
              dispatch(setLoading(false));
              navigate(PAGE.LOGIN.path, { replace: true });
            }
          } catch (error) {
            navigate(PAGE.LOGIN.path, { replace: true });
          } finally {
            dispatch(setLoading(false));
          }
        } else {
          navigate(PAGE.LOGIN.path, { replace: true });
        }
      }
    };

    fetchData();
  }, [tokenPayload, refreshToken, dispatch, navigate]);

  return <div className="h-screen w-screen bg-white">{<MiniDrawer />}</div>;
};

export default PrivateRoute;

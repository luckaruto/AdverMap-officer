import React from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PAGE} from '../components/constants';
import {useEffect} from "react";
import MiniDrawer from "../components/appbar/toolBar";
import app from "../App";
import {setCurrentPage, setLoading, setRefreshToken, setToken} from "../redux/appSlice";
import {AuthService} from "../services/auth/authService";

const PrivateRoute = () => {
    const {token, tokenPayload, refreshToken} = useSelector((state) => state.appState);
    const isLoading = useSelector((state) => state.appState.loading);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    // Check if the user is authenticated

    useEffect( () => {
            if (!tokenPayload || tokenPayload === null) {
                if (refreshToken) {
                    try {
                        dispatch(setLoading(true));
                        const res = AuthService.refreshToken({headers:{"refresh-token": refreshToken}}).then((res) =>{
                            console.log(res);
                            if (res.status === "OK") {
                                dispatch(setToken(res.data.token));
                                dispatch(setRefreshToken(res.data.refreshToken));
                            } else {
                                dispatch(setLoading(false));
                                navigate(PAGE.LOGIN.path, {replace: true});
                            }
                        });
                    } catch (error) {
                        navigate(PAGE.LOGIN.path, {replace: true});
                    } finally {
                        dispatch(setLoading(false));
                    }

                } else {
                    navigate(PAGE.LOGIN.path, {replace: true});
                }
            }

        }
    , [])
        ;

        return (
            <div className="h-screen w-screen bg-white">
                {<MiniDrawer/>}
            </div>
        );
    };
    export default PrivateRoute;

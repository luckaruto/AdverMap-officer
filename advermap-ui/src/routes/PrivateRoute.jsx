import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PAGE} from '../components/constants';
import {useEffect} from "react";
import MiniDrawer from "../components/appbar/toolBar";
import app from "../App";
import {setCurrentPage, setLoading, setRefreshToken, setToken} from "../redux/appSlice";
import {AuthService} from "../services/auth/authService";
import HomePage from "pages/HomePage";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const PrivateRoute = () => {
    const {token, tokenPayload, refreshToken} = useSelector((state) => state.appState);
    const isLoading = useSelector((state) => state.appState.loading);
    const dispatch = useDispatch();
    const [isWsConnect, setIsWsConnect] = useState(false);
    const navigate = useNavigate();
    // Check if the user is authenticated

    useEffect(() => {
            if (!tokenPayload || tokenPayload === null || (tokenPayload.exp && tokenPayload.exp * 1000 < new Date().getTime())) {
                if (refreshToken) {
                    try {
                        dispatch(setLoading(true));
                        const res = AuthService.refreshToken({headers: {"refresh-token": refreshToken}}).then((res) => {
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

            if (!isWsConnect) {
                connect()
            }
        }
        , [])
    ;


    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(tokenPayload.userId);
        stompClient.subscribe('/user/' + tokenPayload.userId + '/private', onPrivateMessage);
    }

    const onPrivateMessage = (payload) => {
        console.log("received ws message");
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
    }

    const onError = (err) => {
        console.log(err);

    }

    return (
        <div className="h-screen w-screen bg-white">
            {<MiniDrawer/>}
        </div>
    );
};
export default PrivateRoute;

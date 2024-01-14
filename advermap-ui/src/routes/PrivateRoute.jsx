import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PAGE} from '../components/constants';
import {useEffect} from "react";
import MiniDrawer from "../components/appbar/toolBar";
import app from "../App";
import {setCurrentPage, setLoading, setRefreshToken, setToken} from "../redux/appSlice";
import {AuthService} from "../services/auth/authService";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';

const PrivateRoute = () => {
    const {token, tokenPayload, refreshToken} = useSelector((state) => state.appState);
    const isLoading = useSelector((state) => state.appState.loading);
    const dispatch = useDispatch();
    const [isWsConnect, setIsWsConnect] = useState(false);
    const [stompClient, setStompClient] = useState(null);

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


            if (!isWsConnect &&stompClient ) {
                try {
                    connect()

                }catch (e) {
                    console.log(e)
                }
            }
        }
        , [])
    ;

    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        const client = over(Sock);
        client.connect({}, onConnected, onError);
        setStompClient(client);
    };

    useEffect(() => {
        // ... your existing code

        return () => {
            // Clean up the WebSocket connection
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, []);

    const onConnected = () => {
        console.log(tokenPayload.userId);
        setIsWsConnect(true);
        stompClient.subscribe('/user/' + tokenPayload.userId + '/private', onPrivateMessage);
    };


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

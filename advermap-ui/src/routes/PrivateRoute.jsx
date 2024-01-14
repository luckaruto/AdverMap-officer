import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PAGE} from '../components/constants';
import {useEffect} from "react";
import MiniDrawer from "../components/appbar/toolBar";
import {setCurrentPage, setLoading, setRefreshToken, setToken} from "../redux/appSlice";
import {AuthService} from "../services/auth/authService";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {fetchNotifications} from "../redux/notificationSlice";

const PrivateRoute = () => {
    const {token, tokenPayload, refreshToken} = useSelector((state) => state.appState);
    const isLoading = useSelector((state) => state.appState.loading);
    const dispatch = useDispatch();
    const [stompClient, setStompClient] = useState(null);

    const navigate = useNavigate();
    // Check if the user is authenticated

    useEffect(() => {
            const connect = () => {
                let Sock = new SockJS('http://localhost:8081/ws');
                const client = over(Sock);
                client.connect({}, () => onConnected(client), onError);
                setStompClient(client);
            };


            const onPrivateMessage = (payload) => {
                console.log("received ws message");
                console.log(payload);
                dispatch(fetchNotifications({token}));
                var payloadData = JSON.parse(payload.body);
            }

            const onConnected = (client) => {
                if (client) {
                    client.subscribe('/user/' + tokenPayload.userId + '/private', onPrivateMessage);
                    setStompClient(client)
                }
            };
            const onError = (err) => {
                console.log(err);
            }


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


            if (!stompClient) {
                connect()
            }

            return () => {
                if (stompClient && stompClient.connected) {
                    stompClient.disconnect();
                    setStompClient(null);
                }
            };
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

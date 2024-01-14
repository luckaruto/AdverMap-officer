import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {DEFAULT, PAGE} from "../../constants";
import {useNavigate} from "react-router-dom";
import NotificationList from "./notificationList";
import { useSpring, useSpringRef, animated } from '@react-spring/web';
import { useTransitionStateManager } from '@mui/base/useTransition';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {fetchNotifications} from "../../../redux/notificationSlice";


export default function NotificationBox() {
    const [anchor, setAnchor] = React.useState(null);
    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const { count, countLoaded } = useSelector((state)=>state.notification);
    console.log(countLoaded);
    console.log(count);

    useEffect(() => {
        if (!countLoaded) {
            console.log("ok")

            dispatch(fetchNotifications({token}));
        }
    }, []);
    const {currentPage,token} = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                size="large"
                aria-label={"show" + count + "new notifications"}
                onClick={handleClick}
                color="inherit"
            >
                <Badge badgeContent={count} color="error">
                    <NotificationsIcon sx={{fontSize: DEFAULT.ICON_SIZE}}/>
                </Badge>
            </IconButton>
            <BasePopup  open={open} anchor={anchor} placement="bottom-end" >
                <ReactSpringTransition>
                    <NotificationList/>
                </ReactSpringTransition>
            </BasePopup>
        </>
    )
}

ReactSpringTransition.propTypes = {
    children: PropTypes.node,
};

function ReactSpringTransition({ children }) {
    const { requestedEnter, onEntering, onEntered, onExiting, onExited } =
        useTransitionStateManager();

    const api = useSpringRef();
    const springs = useSpring({
        ref: api,
        from: { opacity: 0, transform: 'translateY(-8px) scale(0.95)' },
    });

    React.useEffect(() => {
        if (requestedEnter) {
            api.start({
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                config: { tension: 250, friction: 10 },
                onStart: onEntering,
                onRest: onEntered,
            });
        } else {
            api.start({
                opacity: 0,
                transform: 'translateY(-8px) scale(0.95)',
                config: { tension: 170, friction: 26 },
                onStart: onExiting,
                onRest: onExited,
            });
        }
    }, [requestedEnter, api, onEntering, onEntered, onExiting, onExited]);

    return <animated.div style={springs}>{children}</animated.div>;
}
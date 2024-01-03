import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../redux/currentPage.tsx";
import {PAGE, Page} from "../constants.tsx";

export class BarItemProp {
    page: Page;
    icon: string;
}

export default function BarItem({prop} : BarItemProp){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOnClick = () => {
        dispatch(setCurrentPage(prop.page));
        navigate(prop.page.path);
    };

    return (
        <ListItem key={prop.page.path} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={handleOnClick}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <>
                        {prop.icon}
                    </>
                </ListItemIcon>
                <ListItemText primary={prop.page.name} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    )
}
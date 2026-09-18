import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./BottomNav.css";

function BottomNav() {
    const location = useLocation();

    const currentTab = location.pathname.startsWith("/progress")
        ? "/progress"
        : location.pathname;

    return (
        <BottomNavigation
            value={currentTab}
            showLabels
            className="bottom-nav"
        >
            <BottomNavigationAction
                value="/"
                label="Home"
                icon={<HomeOutlinedIcon />}
                component={RouterLink}
                to="/"
                className="bottom-nav-action"
            />

            <BottomNavigationAction
                value="/progress"
                label="Progress"
                icon={<InsightsOutlinedIcon />}
                component={RouterLink}
                to="/progress"
                className="bottom-nav-action"
            />

            <BottomNavigationAction
                value="/edit"
                label="Edit"
                icon={<EditOutlinedIcon />}
                component={RouterLink}
                to="/edit"
                className="bottom-nav-action"
            />
        </BottomNavigation>
    );
}

export default BottomNav;
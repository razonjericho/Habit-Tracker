import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function BottomNav() {
    const location = useLocation();

    const currentTab = location.pathname.startsWith("/progress")
        ? "/progress"
        : location.pathname;

    return (
        <BottomNavigation
            value={currentTab}
            showLabels
            sx={{
                display: {
                    xs: "flex",
                    md: "none",
                },

                position: "fixed",
                bottom: 0,
                left: 0,

                width: "100%",

                zIndex: (theme) => theme.zIndex.appBar,

                bgcolor: "background.paper",
                borderTop: 1,
                borderColor: "divider",

                height: {
                    xs: 64,
                    sm: 72,
                },
            }}
        >
            <BottomNavigationAction
                value="/"
                label="Home"
                icon={<HomeOutlinedIcon />}
                component={RouterLink}
                to="/"
                sx={{
                    minWidth: 0,

                    "& .MuiSvgIcon-root": {
                        fontSize: {
                            xs: 24,
                            sm: 28,
                        },
                    },

                    "& .MuiBottomNavigationAction-label": {
                        fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                        },

                        "&.Mui-selected": {
                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                            },
                        },
                    },
                }}
            />

            <BottomNavigationAction
                value="/progress"
                label="Progress"
                icon={<InsightsOutlinedIcon />}
                component={RouterLink}
                to="/progress"
                sx={{
                    minWidth: 0,

                    "& .MuiSvgIcon-root": {
                        fontSize: {
                            xs: 24,
                            sm: 28,
                        },
                    },

                    "& .MuiBottomNavigationAction-label": {
                        fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                        },

                        "&.Mui-selected": {
                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                            },
                        },
                    },
                }}
            />

            <BottomNavigationAction
                value="/edit"
                label="Edit"
                icon={<EditOutlinedIcon />}
                component={RouterLink}
                to="/edit"
                sx={{
                    minWidth: 0,

                    "& .MuiSvgIcon-root": {
                        fontSize: {
                            xs: 24,
                            sm: 28,
                        },
                    },

                    "& .MuiBottomNavigationAction-label": {
                        fontSize: {
                            xs: "0.75rem",
                            sm: "0.875rem",
                        },

                        "&.Mui-selected": {
                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.875rem",
                            },
                        },
                    },
                }}
            />
        </BottomNavigation>
    );
}

export default BottomNav;
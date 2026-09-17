import React, { useContext, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { AppBar, Toolbar, Typography, Box, Button, Stack, IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./Header.css";

function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    const { logout } = useContext(AuthenticationContext);

    const [anchorEl, setAnchorEl] = useState(null);


    const currentTab = location.pathname.startsWith("/progress")
        ? "/progress"
        : location.pathname;


    const open = Boolean(anchorEl);


    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }


    function handleMenuClose() {
        setAnchorEl(null);
    }


    function handleLogout() {
        handleMenuClose();
        logout();
        navigate("/auth/login");
    }


    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                bgcolor: "background.paper",
                color: "text.primary",
            }}
        >

            <Toolbar
                disableGutters
                className="header-toolbar"
            >

                <Box sx={{ flexGrow: 1 }}>

                    <Typography
                        variant="h5"
                        component="h1"
                        className="header-title"
                    >
                        Habit Tracker
                    </Typography>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >

                    <Box className="header-navigation">

                        <Stack
                            direction="row"
                            className="header-navigation-stack"
                        >
                            <Button
                                component={RouterLink}
                                to="/"
                                startIcon={<HomeOutlinedIcon />}
                                className={`header-nav-button ${
                                    currentTab === "/" ? "active" : ""
                                }`}
                            >
                                Home
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/progress"
                                startIcon={<InsightsOutlinedIcon />}
                                className={`header-nav-button ${
                                    currentTab === "/progress" ? "active" : ""
                                }`}
                            >
                                Progress
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/edit"
                                startIcon={<EditOutlinedIcon />}
                                className={`header-nav-button ${
                                    currentTab === "/edit" ? "active" : ""
                                }`}
                            >
                                Edit
                            </Button>

                        </Stack>

                    </Box>

                    <IconButton
                        onClick={handleMenuOpen}
                        size="large"
                        className="header-menu-button"
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        className="menu"
                    >

                        <MenuItem onClick={handleLogout} className="menu-item">
                            Log Out
                        </MenuItem>

                    </Menu>

                </Box>

            </Toolbar>

        </AppBar>
    );
}


export default Header;
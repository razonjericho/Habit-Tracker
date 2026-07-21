import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { AppBar, Toolbar, Typography, Box, Button, Stack, IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthenticationContext);
    const [ anchorEl, setAnchorEl ] = useState(null);

    const currentTab =
        location.pathname.startsWith("/progress")
            ? "/progress"
            : location.pathname;

    const open = Boolean(anchorEl);

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose(event) {
        setAnchorEl(null);
    }

    function handleLogout() {
        handleMenuClose();
        logout();
        navigate(`/auth/login`); 
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
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },

                    py: 2,
                    minHeight: "unset",
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                        variant="h5"
                        component="h1"
                        sx={{
                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.75rem",
                                md: "2rem",
                            },

                            fontWeight: 700,
                        }}
                    >
                        Habit Tracker
                    </Typography>
                </Box>
                
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: {
                            xs: 1,
                            sm: 2,
                            md: 3,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Stack 
                            direction="row"
                            spacing={{
                                xs: 1,
                                md: 2,
                            }}
                        >
                                <Button 
                                    component={RouterLink}
                                    to="/"
                                    startIcon={
                                        <HomeOutlinedIcon
                                            sx={{
                                                fontSize: {
                                                    xs: 20,
                                                    md: 22,
                                                },
                                            }}
                                        />
                                    }
                                    sx={{
                                        color:
                                            currentTab === "/"
                                                ? "primary.main"
                                                : "text.secondary",

                                        fontWeight:
                                            currentTab === "/"
                                                ? 600
                                                : 400,

                                        fontSize: {
                                            xs: "0.875rem",
                                            md: "1rem",
                                        },

                                        px: {
                                            xs: 1,
                                            md: 2,
                                        },

                                        "&:hover": {
                                            color: "primary.main",
                                            bgcolor: "transparent",
                                        },
                                    }}
                                >
                                    Home
                                </Button>

                                <Button 
                                    startIcon={
                                        <InsightsOutlinedIcon
                                             sx={{
                                                fontSize: {
                                                    xs: 20,
                                                    md: 22,
                                                },
                                            }}
                                        />
                                    }
                                    component={RouterLink}
                                    to="/progress"
                                    sx={{
                                        color:
                                            currentTab === "/progress"
                                                ? "primary.main"
                                                : "text.secondary",

                                        fontWeight:
                                            currentTab === "/progress"
                                                ? 600
                                                : 400,

                                        fontSize: {
                                            xs: "0.875rem",
                                            md: "1rem",
                                        },

                                        px: {
                                            xs: 1,
                                            md: 2,
                                        },
                                    }}
                                >
                                    Progress
                                </Button>

                                <Button 
                                    startIcon={
                                    <EditOutlinedIcon 
                                        sx={{
                                                fontSize: {
                                                    xs: 20,
                                                    md: 22,
                                                },
                                            }}
                                    />
                                    }
                                    component={RouterLink}
                                    to="/edit"
                                    sx={{
                                        color:
                                            currentTab === "/edit"
                                                ? "primary.main"
                                                : "text.secondary",

                                        fontWeight:
                                            currentTab === "/edit"
                                                ? 600
                                                : 400,

                                        fontSize: {
                                            xs: "0.875rem",
                                            md: "1rem",
                                        },

                                        px: {
                                            xs: 1,
                                            md: 2,
                                        },
                                    }}
                                >
                                    Edit
                                </Button> 
                        </Stack>
                    </Box>
                    
                    <IconButton 
                        onClick={handleMenuOpen}
                        size="large" 
                    >
                        <MoreVertIcon /> 
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleLogout}>
                            Log Out
                        </MenuItem>
                    </Menu>
                </Box>
                
            </Toolbar>    
        </AppBar>
    );
}   

export default Header;
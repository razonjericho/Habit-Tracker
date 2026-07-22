import React, { useContext, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { AppBar, Toolbar, Typography, Box, Button, Stack, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                        lg: 6,
                    },

                    py: {
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                        lg: 2.5,
                    },

                    minHeight: "unset",
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 700,

                            fontSize: {
                                xs: "1.5rem",
                                sm: "1.85rem",
                                md: "2.2rem",
                                lg: "2rem",
                            },
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
                                md: 2,
                                lg: 2.5,
                            }}
                        >
                            <Button
                                component={RouterLink}
                                to="/"
                                startIcon={
                                    <HomeOutlinedIcon
                                        sx={{
                                            fontSize: {
                                                md: 24,
                                                lg: 22,
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
                                        md: "1.05rem",
                                        lg: "1rem",
                                    },

                                    px: {
                                        md: 2.5,
                                        lg: 2,
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
                                component={RouterLink}
                                to="/progress"
                                startIcon={
                                    <InsightsOutlinedIcon
                                        sx={{
                                            fontSize: {
                                                md: 24,
                                                lg: 22,
                                            },
                                        }}
                                    />
                                }
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
                                        md: "1.05rem",
                                        lg: "1rem",
                                    },

                                    px: {
                                        md: 2.5,
                                        lg: 2,
                                    },

                                    "&:hover": {
                                        color: "primary.main",
                                        bgcolor: "transparent",
                                    },
                                }}
                            >
                                Progress
                            </Button>

                            <Button
                                component={RouterLink}
                                to="/edit"
                                startIcon={
                                    <EditOutlinedIcon
                                        sx={{
                                            fontSize: {
                                                md: 24,
                                                lg: 22,
                                            },
                                        }}
                                    />
                                }
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
                                        md: "1.05rem",
                                        lg: "1rem",
                                    },

                                    px: {
                                        md: 2.5,
                                        lg: 2,
                                    },

                                    "&:hover": {
                                        color: "primary.main",
                                        bgcolor: "transparent",
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
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: {
                                    xs: 28,
                                    sm: 30,
                                    md: 34,
                                    lg: 32,
                                },
                            },
                        }}
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
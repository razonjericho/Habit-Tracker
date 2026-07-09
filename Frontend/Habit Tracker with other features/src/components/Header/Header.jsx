import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import './Header.css'
import { AuthenticationContext } from '../../../Context/AuthenticationContext';
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
            color="inherit"
            elevation={1}
        >
            <Toolbar
                sx={{
                    width: "100%",
                    px: 3,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                        variant="h5"
                        component="h1"
                    >
                        Habit Tracker
                    </Typography>
                </Box>
                
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "block"
                            }
                        }}
                    >
                        <Stack 
                            direction="row"
                            spacing={1}
                        >
                                <Button 
                                    startIcon={<HomeOutlinedIcon />} 
                                    component={RouterLink} 
                                    to="/"
                                    sx={{
                                        color: currentTab === "/" ? "primary.main" : "text.secondary",
                                        fontWeight: currentTab === "/" ? 600 : 400,
                                    }}
                                >
                                    Home
                                </Button>
                                <Button 
                                startIcon={<InsightsOutlinedIcon />} 
                                component={RouterLink} 
                                to="/progress"
                                sx={{
                                    color: currentTab === "/progress" ? "primary.main" : "text.secondary",
                                    fontWeight: currentTab === "/progress" ? 600 : 400,
                                }}
                                >
                                    Progress
                                </Button> 
                                <Button 
                                startIcon={<EditOutlinedIcon />} 
                                component={RouterLink} 
                                to="/edit"
                                sx={{
                                    color: currentTab === "/edit" ? "primary.main" : "text.secondary",
                                    fontWeight: currentTab === "/edit" ? 600 : 400,
                                }}
                                >
                                    Edit
                                </Button> 
                        </Stack>
                    </Box>
                    
                    <IconButton onClick={handleMenuOpen} >
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
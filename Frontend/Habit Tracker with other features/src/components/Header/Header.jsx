import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';
import { AppBar, Toolbar, Typography, Box,  Button } from "@mui/material"

function Header() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthenticationContext);

    function handleLogout() { 
        logout();
        navigate(`/auth/login`); 
    }


    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={1}
        >
            <Toolbar>
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
                        <nav className="header-nav">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/edit">Edit</Link></li>
                                <li><Link to="/progress">Progress</Link></li>
                            </ul>      
                        </nav>
                    </Box>
                    
                    <Button onClick={handleLogout} > Log Out </Button>
                </Box>
                
            </Toolbar>    
        </AppBar>
    );
}   

export default Header;
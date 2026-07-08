import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BottomNavigationAction, BottomNavigation } from "@mui/material"

function BottomNav() {
    return (  
                <BottomNavigation
                    showLabels
                    sx={{
                        display: {
                            xs: "flex",
                            md: "none",
                        },
                        zIndex: (theme) => theme.zIndex.appBar,
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <BottomNavigationAction label="Home" component={RouterLink} to="/" />
                    <BottomNavigationAction label="Progress" component={RouterLink} to="/progress" />  
                    <BottomNavigationAction label="Edit" component={RouterLink} to="/edit" />
                </BottomNavigation>
            
    )
}

export default BottomNav;
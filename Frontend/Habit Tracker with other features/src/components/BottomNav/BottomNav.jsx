import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { BottomNavigationAction, BottomNavigation } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"


function BottomNav() {
    const location = useLocation();

    const currentTab =
        location.pathname.startsWith("/progress")
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
                        zIndex: (theme) => theme.zIndex.appBar,
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                    }}
                >
                    <BottomNavigationAction value="/" label="Home" icon={<HomeOutlinedIcon />} component={RouterLink} to="/" />
                    <BottomNavigationAction value="/progress" label="Progress" icon={<InsightsOutlinedIcon />} component={RouterLink} to="/progress" />  
                    <BottomNavigationAction value="/edit" label="Edit" icon={<EditOutlinedIcon />} component={RouterLink} to="/edit" />
                </BottomNavigation>
            
    )
}

export default BottomNav;
import React from 'react';
import { Box, ListItem, ListItemText, Divider, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

function EditHabitItem(props) {
    return (
        <Box>
            <ListItem
                sx={{
                    py: 2,
                    justifyContent: "space-between",
                }}
            >
                <ListItemText 
                    primary={props.text}
                    slotProps={{
                        primary: {
                            sx: {
                                fontWeight: 550,
                            },
                        },
                    }}
                />

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        flexShrink: 0,
                    }} 
                >
                    <Tooltip title="Rename">
                        <IconButton
                            sx={{
                                color:"primary.main",
                            }}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Archive">
                        <IconButton
                            sx={{
                                color:"primary.main",
                            }}
                        >
                            <ArchiveOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    
                </Stack>
            </ListItem>

            <Divider />
        </Box>
    )
}

export default EditHabitItem;
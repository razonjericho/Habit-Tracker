import React from 'react';
import { Box, ListItem, ListItemText, Divider, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

function EditHabitItem(props) {
    
    return (
        <Box>
            <ListItem
                sx={{
                    py: 1.5,
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
                    {props.mode === "active" && (
                        <Box>
                            <Tooltip title="Rename">
                                <IconButton
                                    onClick = {() => { props.onRename(props.id) }}
                                    sx={{
                                        color:"primary.main",
                                    }}
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Archive">
                                <IconButton
                                    onClick = {() => { props.onArchive(props.id) }}
                                    sx={{
                                        color:"primary.main",
                                    }}
                                >
                                    <ArchiveOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    {props.mode === "archived" && (
                        <Box>
                            <Tooltip title="Restore">
                                <IconButton
                                    onClick={() => { props.onRestore(props.id) }}
                                    sx={{
                                        color:"primary.main",
                                    }}
                                >
                                    <AutorenewOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={() => { props.onDelete(props.id) }}
                                    sx={{
                                        color:"primary.main",
                                    }}
                                >
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="View details">
                                <IconButton 
                                    onClick={() => { props.onViewDetails(props.id) }}
                                    aria-label="View habit details"
                                > 
                                    <ChevronRightIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )} 
                </Stack>

            </ListItem>

            {!props.isLast && <Divider />}
        </Box>
    )
}

export default EditHabitItem;
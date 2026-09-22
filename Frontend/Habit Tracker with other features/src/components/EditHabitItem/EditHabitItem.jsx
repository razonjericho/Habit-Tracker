import React from "react";
import { Box, ListItem, ListItemText, Divider, Stack, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./EditHabitItem.css";

function EditHabitItem(props) {

    return (
        <Box className="edit-habit-item">
            <ListItem className="edit-habit-item-row">

                <ListItemText
                    primary={props.text}
                    className="edit-habit-item-text"
                    slotProps={{
                        primary: {
                            className: "edit-habit-item-name",
                        },
                    }}
                />

                <Stack
                    direction="row"
                    spacing={1}
                    className="edit-habit-item-actions"
                >
                    {props.mode === "active" && (
                        <Box>
                            <Tooltip title="Rename">
                                <IconButton
                                    onClick={() => props.onRename(props.id)}
                                    className="edit-habit-item-button"
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Archive">
                                <IconButton
                                    onClick={() => props.onArchive(props.id)}
                                    className="edit-habit-item-button"
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
                                    onClick={() => props.onRestore(props.id)}
                                    className="edit-habit-item-button"
                                >
                                    <AutorenewOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={() => props.onDelete(props.id)}
                                    className="edit-habit-item-button"
                                >
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="View details">
                                <IconButton
                                    onClick={() => props.onViewDetails(props.id)}
                                    aria-label="View habit details"
                                    className="view-details-button"
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
    );
}

export default EditHabitItem;
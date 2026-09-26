import React from "react";
import { Box, Button, Dialog, DialogContent, Typography, DialogActions } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import "./DeleteHabitModal.css";

function DeleteHabitModal({ isOpen, habit, onClose, onDelete }) {
    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            className="delete-habit-dialog"
        >
            <DialogContent className="delete-habit-content">
                <Box className="delete-habit-icon-container">
                    <DeleteOutlinedIcon className="delete-habit-icon" />
                </Box>

                <Typography
                    variant="h5"
                    className="delete-habit-title"
                >
                    Delete Habit
                </Typography>

                <Typography
                    variant="body1"
                    className="delete-habit-question"
                >
                    Are you sure you want to delete this habit?
                </Typography>

                <Typography
                    variant="body1"
                    className="delete-habit-description"
                >
                    This action cannot be undone and all habit data will be
                    permanently lost.
                </Typography>

                <Box className="delete-habit-warning">
                    <WarningAmberRoundedIcon className="delete-habit-warning-icon" />

                    <Box>
                        <Typography
                            variant="body2"
                            className="delete-habit-warning-title"
                        >
                            This will permanently delete:
                        </Typography>

                        <Typography
                            variant="body2"
                            className="delete-habit-warning-text"
                        >
                            <strong>"{habit?.habit}"</strong> and all of its
                            progress.
                        </Typography>
                    </Box>
                </Box>

            </DialogContent>

            <DialogActions className="delete-habit-actions">
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    className="delete-habit-cancel-button"
                >
                    Cancel
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={onDelete}
                    className="delete-habit-button"
                >
                    Delete Habit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteHabitModal;
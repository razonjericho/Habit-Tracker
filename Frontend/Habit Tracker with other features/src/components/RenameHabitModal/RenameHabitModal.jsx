import { React, useState, useEffect } from "react";
import { TextField, Box, Button, Dialog, DialogContent, Typography, DialogActions } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./RenameHabitModal.css";

function RenameHabitModal({ isOpen, habit, onClose, onSave }) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (habit) {
            setInputText(habit.habit);
            setError("");
        }
    }, [habit]);

    if (!isOpen) {
        return null;
    }

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);

        if (error) {
            setError("");
        }
    }

    function handleSave() {
        if (inputText.trim() === "") {
            setError("Please enter a habit name");
            return;
        }

        onSave(inputText.trim());
    }

    return (
        <Dialog
            open={isOpen}
            className="rename-habit-dialog"
        >
            <DialogContent className="rename-habit-content">

                <Box className="rename-habit-icon-container">
                    <EditOutlinedIcon className="rename-habit-icon" />
                </Box>

                <Typography
                    variant="h5"
                    className="rename-habit-title"
                >
                    Rename Habit
                </Typography>

                <Typography
                    variant="body1"
                    className="rename-habit-description"
                >
                    Enter a new name for your habit.
                </Typography>

                <Box className="rename-habit-input-container">

                    <Typography
                        variant="body2"
                        className="rename-habit-label"
                    >
                        Habit name
                    </Typography>

                    <TextField
                        fullWidth
                        value={inputText}
                        onChange={handleChange}
                        error={Boolean(error)}
                        helperText={error}
                        placeholder="Enter habit name"
                        className="rename-habit-field"
                    />

                </Box>

                <Box className="rename-habit-info">

                    <InfoOutlinedIcon className="rename-habit-info-icon" />

                    <Typography
                        variant="body2"
                        className="rename-habit-info-text"
                    >
                        Only the habit name will change. Your streak,
                        completion history, and progress will be kept.
                    </Typography>

                </Box>

            </DialogContent>

            <DialogActions className="rename-habit-actions">

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    className="rename-habit-cancel-button"
                >
                    Cancel
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSave}
                    className="rename-habit-save-button"
                >
                    Save Changes
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default RenameHabitModal;
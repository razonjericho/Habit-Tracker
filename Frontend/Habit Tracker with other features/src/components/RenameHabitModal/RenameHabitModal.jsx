import { React, useState, useEffect } from 'react';
import { TextField, Box, Button, Stack, Card, CardContent, Typography } from "@mui/material";

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
            <div>
                <h2>Rename Habit</h2>
                <TextField
                    value={inputText}
                    onChange={handleChange}
                    error={Boolean(error)}
                    helperText={error}
                />
                <button
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>
    )
}

export default RenameHabitModal;
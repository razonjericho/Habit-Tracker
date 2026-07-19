import { React, useState, useEffect } from 'react';
import { TextField, Box, Button, Stack, Card, CardContent, Typography } from "@mui/material";

function DeleteHabitModal({ isOpen, habit, onClose, onDelete }) {
    if (!isOpen) {
        return null;
    }

    return (
            <div>
                <h2>Delete Habit</h2>
                <p>Are you sure you want to delete this habit? This action cannot be undone and all habit data will be permanently lost.</p>
                <button
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    onClick={onDelete}
                >
                    Delete Habit
                </button>
            </div>
    )
}

export default DeleteHabitModal;
import React, { useState } from "react";
import { TextField, Box, Button, Stack, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./HabitInput.css";

function HabitInput(props) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState("");

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);

        if (error) {
            setError("");
        }
    }

    const handleAdd = () => {
        if (inputText.trim() === "") {
            setError("Please enter a habit name");
            return;
        }

        props.onAdd(inputText.trim());
        setInputText("");
        setError("");
    };

    return (
        <Card
            elevation={0}
            className="habit-input-card"
        >
            <CardContent className="habit-input-content">
                <Stack className="habit-input-stack">
                    <Box className="habit-input-header">
                        <Box className="habit-input-icon">
                            <AddIcon
                                color="primary"
                                className="habit-input-add-icon"
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                className="habit-input-title"
                            >
                                Add New Habit
                            </Typography>

                            <Typography
                                variant="body1"
                                className="habit-input-description"
                            >
                                Create a new habit to track
                            </Typography>
                        </Box>
                    </Box>

                    <TextField
                        placeholder="Enter habit name..."
                        onChange={handleChange}
                        value={inputText}
                        error={Boolean(error)}
                        helperText={error}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleAdd();
                            }
                        }}
                        className="habit-input-field"
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={
                            <AddIcon className="habit-input-button-icon" />
                        }
                        onClick={handleAdd}
                        className="habit-input-button"
                    >
                        <Typography className="habit-input-button-text">
                            Add Habit
                        </Typography>
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default HabitInput;
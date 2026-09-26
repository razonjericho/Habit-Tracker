import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Stack, Button } from "@mui/material";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AddIcon from "@mui/icons-material/Add";
import "./EmptyHabitState.css";

function EmptyHabitState() {
    const navigate = useNavigate();

    return (
        <Card className="empty-habit-card">
            <CardContent className="empty-habit-card-content">
                <Stack className="empty-habit-content">
                    <Box className="empty-habit-icon-container">
                        <AssignmentRoundedIcon className="empty-habit-icon" />
                    </Box>

                    <Typography
                        variant="h6"
                        className="empty-habit-title"
                    >
                        No habits yet
                    </Typography>

                    <Typography
                        variant="body2"
                        align="center"
                        className="empty-habit-description"
                    >
                        Create your first habit to start building your daily
                        routine.
                    </Typography>

                </Stack>

                <Stack className="empty-habit-button-container">
                    <Button
                        variant="contained"
                        onClick={() => navigate("/edit")}
                        startIcon={<AddIcon />}
                        className="empty-habit-button"
                    >
                        Create Habit
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default EmptyHabitState;
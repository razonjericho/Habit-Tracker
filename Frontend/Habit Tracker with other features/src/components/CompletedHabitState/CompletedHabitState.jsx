import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import "./CompletedHabitState.css";

function CompletedHabitState() {
    return (
        <Card
            elevation={0}
            className="completed-habit-card"
        >
            <CardContent className="completed-habit-content">
                <Stack className="completed-habit-stack">

                    <Box className="completed-habit-icon-container">
                        <DoneRoundedIcon className="completed-habit-icon" />
                    </Box>

                    <Typography
                        variant="h6"
                        className="completed-habit-title"
                    >
                        All done for today!
                    </Typography>

                    <Typography
                        variant="body2"
                        className="completed-habit-description"
                    >
                        Great job! You've completed all your habits.
                    </Typography>

                </Stack>
            </CardContent>
        </Card>
    );
}

export default CompletedHabitState;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { HabitContext } from "../../../context/HabitContext";
import Calendar from "../../../services/Calendar/Calendar";
import useUnauthorizedHandler from "../../../hooks/UseUnauthorizedHandler";
import { AuthenticationContext } from "../../../context/AuthenticationContext";
import { API_URL } from "../../../config";
import { Container, Box, Stack, Typography, Button, IconButton, Card, CardContent, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./HabitDetails.css";

function HabitDetailsPage(props) {
    const params = useParams();
    const id = Number(params.id);

    const context = useContext(HabitContext);
    const { habits } = context;

    const [streaks, setStreak] = useState(null);

    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/habits/progress/${id}/details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStreak(response.data);
            } catch (err) {
                handleUnauthorized(err);
                console.error(
                    "Error, unable to get habit streak:",
                    err
                );
            }
        };

        fetchStreak();
    }, [id]);

    if (streaks === null) {
        return <p>loading...</p>;
    }

    const selectedHabit = habits.find(
        (habit) => habit.id === id
    );

    if (!selectedHabit) {
        return <p>Habit not found</p>;
    }

    const dates = streaks ? streaks.dates : [];

    const completedDates = new Set(
        dates.map((date) =>
            new Date(date).toLocaleDateString("en-CA")
        )
    );

    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    return (
        <Container
            maxWidth="lg"
            className="habit-details-container"
        >
            <Stack className="habit-details-content">
                <Button
                    className="habit-details-back-button"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/progress")}
                >
                    Progress
                </Button>

                <Typography
                    variant="h2"
                    component="h1"
                    className="habit-details-title"
                >
                    Habit Details
                </Typography>

                <Card
                    elevation={0}
                    className="habit-details-calendar-card"
                >
                    <CardContent className="habit-details-calendar-content">
                        <Box className="habit-details-month-navigation">
                            <IconButton
                                onClick={props.previous}
                                aria-label="Previous month"
                                className="progress-month-navigation-button"
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Typography
                                variant="h4"
                                className="habit-details-month-title"
                            >
                                {months[props.month]} {props.year}
                            </Typography>

                            <IconButton
                                onClick={props.next}
                                aria-label="Next month"
                                className="progress-month-navigation-button"
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>

                        <Calendar
                            year={props.year}
                            month={props.month}
                            completedDates={completedDates}
                        />

                        <Box className="habit-details-calendar-legend">
                            <Stack
                                direction="row"
                                className="habit-details-legend-container"
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    className="habit-details-legend-item"
                                >
                                    <Box className="habit-details-legend-box not-completed" />

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        className="habit-details-legend-label"
                                    >
                                        Not Completed
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    className="habit-details-legend-item"
                                >
                                    <Box className="habit-details-legend-box completed" />

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        className="habit-details-legend-label"
                                    >
                                        Completed
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

                <Card className="habit-details-stats-card">
                    <CardContent className="habit-details-stats-content">
                        <Typography
                            variant="h6"
                            className="habit-details-habit-name"
                        >
                            {selectedHabit.habit}
                        </Typography>

                        <Divider className="habit-details-stats-divider" />

                        <Box className="habit-details-stats-grid">
                            <Box className="habit-details-stat">
                                <Stack spacing={1}>
                                    <Typography 
                                        variant="body2"
                                        className="habit-details-stat-label"
                                    >
                                        Current Streak
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        className="habit-details-stat-value"
                                    >
                                        {streaks.streak} day
                                        {streaks.streak === 1 ? "" : "s"}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Divider
                                orientation="vertical"
                                flexItem
                            />

                            <Box className="habit-details-stat">
                                <Stack spacing={1}>
                                    <Typography 
                                        variant="body2"
                                        className="habit-details-stat-label"
                                    >
                                        Longest Streak
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        className="habit-details-stat-value"
                                    >
                                        {streaks.longestStreak} day
                                        {streaks.streak === 1 ? "" : "s"}
                                    </Typography>
                                </Stack>
                            </Box>

                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}

export default HabitDetailsPage;
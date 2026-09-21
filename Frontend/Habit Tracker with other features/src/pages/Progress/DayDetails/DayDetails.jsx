import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import HabitList from "../../../components/HabitList/HabitList";
import useUnauthorizedHandler from "../../../hooks/UseUnauthorizedHandler";
import { AuthenticationContext } from "../../../context/AuthenticationContext";
import { Container, Box, Typography, Button, Card, CardContent, Stack, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { API_URL } from "../../../config";
import "./DayDetails.css";

function DayDetails() {
    const { date } = useParams();
    const [dayDetails, setDayDetails] = useState(null);

    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDayDetails = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/habits/progress/day/${date}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setDayDetails(response.data);
            } catch (err) {
                handleUnauthorized(err);
                console.error(
                    "Error, unable to load the details of this date",
                    err
                );
            }
        };
        fetchDayDetails();
    }, [date]);

    const currentDate = new Date(`${date}T00:00:00`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isFutureDate = currentDate > today;

    const formattedDate = currentDate.toLocaleDateString("en-CA", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formattedDay = currentDate.toLocaleDateString("en-CA", {
        weekday: "long",
    });

    const habitsForDay = dayDetails?.dayDetails || [];

    const incompletedHabits = habitsForDay.filter(
        (habit) => !habit.isCompleted
    );

    const completedHabits = habitsForDay.filter(
        (habit) => habit.isCompleted
    );

    const completedCount = completedHabits.length;
    const incompletedCount = incompletedHabits.length;

    return (
        <Container
            maxWidth="lg"
            className="day-details-container"
        >
            <Button
                className="day-details-back-button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                onClick={() => navigate("/progress")}
                disableRipple
            >
                Progress
            </Button>

            <Typography
                variant="h2"
                component="h1"
                className="day-details-title"
            >
                Day Details
            </Typography>

            <Card
                elevation={0}
                className="day-details-summary-card"
            >
                <CardContent className="day-details-summary-content">
                    <Box className="day-details-date-header">
                        <Box className="day-details-date-icon">
                            <CalendarMonthOutlinedIcon
                                color="primary"
                                className="day-details-calendar-icon"
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h5"
                                className="day-details-date"
                            >
                                {formattedDate}
                            </Typography>

                            <Typography
                                variant="body1"
                                className="day-details-weekday"
                            >
                                {formattedDay}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider className="day-details-summary-divider" />

                    <Box className="day-details-stats-grid">
                        <Box className="day-details-stat">
                            <Stack
                                spacing={0.5}
                                className="day-details-stat-stack"
                            >
                                <Box className="day-details-stat-value-row">
                                    <CheckCircleIcon
                                        color="success"
                                        className="day-details-stat-icon"
                                    />

                                    <Typography
                                        variant="h4"
                                        className="day-details-stat-number"
                                    >
                                        {isFutureDate
                                            ? "–"
                                            : completedCount}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="day-details-stat-label"
                                >
                                    Completed
                                </Typography>
                            </Stack>
                        </Box>

                        <Divider
                            orientation="vertical"
                            flexItem
                        />

                        <Box className="day-details-stat">
                            <Stack
                                spacing={0.5}
                                className="day-details-stat-stack"
                            >
                                <Box className="day-details-stat-value-row day-details-incomplete-row">
                                    <RadioButtonUncheckedIcon
                                        className="day-details-stat-icon day-details-incomplete-icon"
                                    />

                                    <Typography
                                        variant="h4"
                                        className="day-details-stat-number"
                                    >
                                        {isFutureDate
                                            ? "–"
                                            : incompletedCount}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    className="day-details-stat-label"
                                >
                                    Not Completed
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {isFutureDate ? (
                <Card
                    elevation={0}
                    className="day-details-future-card"
                >
                    <CardContent className="day-details-future-content">
                        <Stack
                            direction="row"
                            spacing={2.5}
                            className="day-details-future-stack"
                        >
                            <Box className="day-details-future-icon">
                                <CalendarMonthOutlinedIcon
                                    className="day-details-future-calendar-icon"
                                    color="primary"
                                    fontSize="large"
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    className="day-details-future-title"
                                >
                                    This day hasn't happened yet.
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className="day-details-future-description"
                                >
                                    Progress for this day will become
                                    available once the day begins.
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <Box className="day-details-section">
                        <Box className="day-details-section-heading">
                            <CheckCircleIcon
                                color="success"
                                className="day-details-section-icon"
                            />

                            <Typography
                                variant="h5"
                                className="day-details-section-title"
                            >
                                Completed Habits
                            </Typography>
                        </Box>

                        <HabitList
                            habits={completedHabits}
                            status="completed"
                        />
                    </Box>

                    <Box className="day-details-section">
                        <Box className="day-details-section-heading">
                            <RadioButtonUncheckedIcon
                                className="day-details-section-icon day-details-incomplete-icon"
                            />
                            <Typography
                                variant="h5"
                                className="day-details-section-title"
                            >
                                Not Completed Habits
                            </Typography>
                        </Box>

                        <HabitList
                            habits={incompletedHabits}
                            status="not-completed"
                        />
                    </Box>
                </>
            )}
        </Container>
    );
}

export default DayDetails;
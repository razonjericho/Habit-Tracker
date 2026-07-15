import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../../../components/HabitList/HabitList"
import { useParams, useNavigate } from 'react-router-dom';
import { HabitContext } from '../../../../Context/HabitContext';
import './HabitDetails.css'
import Calendar from '../../../services/Calendar/Calendar';
import useUnauthorizedHandler from '../../../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';
import { Container, Box, Stack, Typography, Button, Paper, IconButton, Card, CardContent } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function HabitDetailsPage(props){
    const params = useParams();
    const id = Number(params.id);
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState(null);
    const API_URL = "http://localhost:3000";
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(() => {
         const fetchStreak = async () => {
                try {
                   const response = await axios.get(`${API_URL}/habits/progress/${id}/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                   });

                setStreak(response.data);

                } catch (err) {
                    handleUnauthorized(err);
                    console.error('Error, unable to get habit streak:', err);
                }
            }
                fetchStreak();
    }, [id]);

    if (streaks === null) {
        return <p>loading...</p>
    }

    const selectedHabit = habits.find(habit => habit.id === id);

    if (!selectedHabit) {
        return <p>Habit not found</p>;
    }

    const dates = streaks ? streaks.dates : [];

    const completedDates = new Set(
        dates.map(date =>
            new Date(date).toLocaleDateString("en-CA")
        )
    );

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
            }}
        >
            <Stack
                spacing={{
                    xs: 2,
                    sm: 3,
                    md: 4,
                }}
            >
                <Button 
                    startIcon={<ArrowBackIcon />}
                    variant="text"
                    onClick={() => navigate("/progress")}
                    disableRipple
                    sx={{
                        alignSelf: "flex-start",

                        px: 0,
                        minWidth: 0,

                        color: "primary.main",

                        fontWeight: 600,

                        "&:hover": {
                            bgcolor: "transparent",
                            color: "primary.dark",
                        },
                    }}
                >
                    Progress
                </Button>

                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "2.25rem",
                            md: "2.5rem",
                        },

                        fontWeight: 700,
                    }}
                >
                    Habit Details
                </Typography>

                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,

                        border: "1px solid",
                        borderColor: "divider",

                        mb: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            p: {
                                xs: 2,
                                sm: 3,
                            },

                            "&:last-child": {
                                pb: {
                                    xs: 2,
                                    sm: 3,
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                gap: {
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                },

                                mb: {
                                    xs: 2,
                                    sm: 3,
                                    md: 4,
                                },
                            }}
                        >
                            <IconButton
                                onClick={props.previous}
                                aria-label="Previous month"
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,

                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "1.75rem",
                                        md: "2rem",
                                    },
                                }}
                            > 
                                {months[props.month]} {props.year} 
                            </Typography>

                            <IconButton 
                                onClick= {props.next}
                                aria-label="Next month"
                            > 
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>

                        <Calendar 
                            year={props.year} 
                            month={props.month} 
                            completedDates={completedDates}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",

                                mt: {
                                    xs: 2,
                                    sm: 2.5,
                                    md: 3,
                                },
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={{
                                    xs: 2,
                                    sm: 3,
                                }}
                                sx={{
                                    alignItems:"center",
                                }}
                                
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                       alignItems:"center",
                                    }}  
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                xs: 18,
                                                sm: 20,
                                                md: 22,
                                            },

                                            height: {
                                                xs: 10,
                                                sm: 12,
                                                md: 14,
                                            },

                                            bgcolor: "background.default",

                                            borderRadius: "999px",

                                            border: "1px solid",
                                            borderColor: "divider",
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Not Completed
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                       alignItems:"center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: {
                                                xs: 18,
                                                sm: 20,
                                                md: 22,
                                            },

                                            height: {
                                                xs: 10,
                                                sm: 12,
                                                md: 14,
                                            },

                                            bgcolor: "#F97316",

                                            borderRadius: "999px",
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Completed
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>

                <p>Habit: {selectedHabit.habit}</p>
                <p>Current Streak: {streaks.streak}</p>
                <p>Longest Streak: {streaks.longestStreak}</p>
            </Stack>
        </Container>
    )
}

export default HabitDetailsPage;
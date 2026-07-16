import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import HabitList from '../../../components/HabitList/HabitList';
import useUnauthorizedHandler from '../../../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from '../../../../Context/AuthenticationContext';
import { Container, Box, Typography, Button, Card, CardContent, Stack, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function DayDetails () {
    const { date } = useParams();
    const API_URL = "http://localhost:3000";
    const [ dayDetails, setDayDetails ]   = useState(null);;
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDayDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/habits/progress/day/${date}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDayDetails(response.data);
            } catch (err) {
                handleUnauthorized(err);
                console.error('Error, unable to load the details of this date', err);
            }
        }
            fetchDayDetails();
    }, [date]);

    const currentDate = new Date(`${date}T00:00:00`);

    const formattedDate = currentDate.toLocaleDateString(
        "en-CA",
        {
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );

    const formattedDay = currentDate.toLocaleDateString("en-CA", {
        weekday: "long",
    });

    const habitsForDay = dayDetails?.dayDetails || [];

    const incompletedHabits = habitsForDay.filter(habit => !habit.isCompleted);
    const completedHabits = habitsForDay.filter(habit => habit.isCompleted);

    const completedCount = completedHabits.length;
    const incompletedCount = incompletedHabits.length;

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                pb: {
                    xs: 10,
                    sm: 11,
                    md: 6,
                },
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
                    Day Details
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
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            p: {
                                xs: 2.5,
                                sm: 3,
                            },

                            "&:last-child": {
                                pb: {
                                    xs: 2.5,
                                    sm: 3,
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: 56,
                                        sm: 64,
                                    },
                                    height: {
                                        xs: 56,
                                        sm: 64,
                                    },

                                    borderRadius: "50%",

                                    border: "1px solid",
                                    borderColor: "divider",

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    flexShrink: 0,
                                }}
                            >
                                <CalendarMonthOutlinedIcon
                                    color="primary"
                                    sx={{
                                        fontSize: {
                                            xs: 28,
                                            sm: 32,
                                        },
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mt: 0.5,
                                        fontWeight: 600,
                                    }}
                                >
                                    {formattedDate}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {formattedDay}
                                </Typography>
                            </Box>
                        </Box>
                        

                        <Divider sx={{ my: 3, }} />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto 1fr",
                                justifyContent: "center",
                                gap: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        alignItems:"center",
                                    }}      
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            pr: 1,
                                        }}
                                    >

                                        <CheckCircleIcon
                                            color="success"
                                            sx={{
                                                fontSize: 24,
                                            }}
                                        />

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 550,
                                            }}
                                        >
                                            {completedCount}
                                        </Typography>

                                    </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Completed
                                        </Typography>
                                    
                                </Stack>
                            </Box>

                            <Divider
                                orientation="vertical"
                                flexItem
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Stack
                                    spacing={0.5}
                                    sx={{
                                        alignItems:"center",
                                    }}  
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            pr: 1,
                                        }}
                                    >

                                        <RadioButtonUncheckedIcon
                                            sx={{
                                                fontSize: 24,
                                                color: "text.secondary",
                                            }}
                                        />

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: 550,
                                            }}
                                        >
                                            {incompletedCount}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Not Completed
                                    </Typography>
                                    
                                </Stack>
                            </Box>
                        </Box>

                        
                    </CardContent>
                </Card>
                
                
                <Typography>Completed Habits</Typography>
                    <HabitList habits={completedHabits} />
                <Typography>Not Completed Habits</Typography>
                    <HabitList habits={incompletedHabits} />
            
        </Container>
    )
    
}

export default DayDetails;
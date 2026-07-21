import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../../components/HabitList/HabitList";
import Tooltip from '../../components/Tooltip/Tooltip';
import { HabitContext } from '../../context/HabitContext';
import { useNavigate } from 'react-router-dom';
import useUnauthorizedHandler from '../../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { Container, Typography, Box, IconButton, Card, CardContent } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { API_URL } from '../../config';

function ProgressPage(props) {
    const context = useContext(HabitContext);
    const { habits } = context;
    const [ streaks, setStreak ] = useState({});
    const [ heatMap, setHeatMap ] = useState({});
    const activeHabits = habits.filter(habit => habit.active === true);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const handleUnauthorized = useUnauthorizedHandler();
    const { token } = useContext(AuthenticationContext);

    useEffect(() => {
        if (habits.length === 0) return;

         const fetchStreak = async () => {
                try {
                   const requests = habits.map(habit => 
                     axios.get(`${API_URL}/habits/progress/${habit.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                     })
                );

                const responses = await Promise.all(requests);

                const streakData = {};
                responses.forEach(response => {
                    const { habit_id, streak } = response.data;
                    streakData[habit_id] = streak;
                })
                
                setStreak(streakData);

                } catch (err) {
                    handleUnauthorized(err);
                    console.error('Error, unable to get habit streak:', err);
                }
            }
                fetchStreak();
    }, [habits]);

    useEffect(() => {
        const fetchHeatMap = async () => {   
            try {
                const response = await axios.get(`${API_URL}/habits/progress`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setHeatMap(response.data);
            } catch (err) {
                handleUnauthorized(err);
                console.error('Error, unable to fetch completion count', err);
            }
        }

        fetchHeatMap();
    }, [])

    const navigate = useNavigate();

    function viewHabitDetails(id) {
        navigate(`/progress/${id}`);
    }

    function viewDayDetails(date) {
        navigate(`/progress/day/${date}`);
    }

   
    return (
        <Container
            sx={{
                py: {
                    xs: 3,
                    sm: 4,
                    md: 6,
                },

                px: {
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
                Progress
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
                            onClick= {props.previous}
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
                    
                    <Tooltip
                        month={props.month}
                        year={props.year}
                        heatMap={heatMap}
                        onViewDayDetails={viewDayDetails}
                    />
                </CardContent>
            </Card>

            <HabitList
                habits={activeHabits}
                streaks={streaks}
                onViewDetails={viewHabitDetails}            
            />
            
        </Container>
    )
}

export default ProgressPage;
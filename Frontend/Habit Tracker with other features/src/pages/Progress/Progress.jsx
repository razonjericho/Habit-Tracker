import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HabitList from "../../components/HabitList/HabitList";
import Tooltip from '../../components/Tooltip/Tooltip';
import { HabitContext } from '../../../Context/HabitContext';
import { useNavigate } from 'react-router-dom';
import './Progress.css';
import useUnauthorizedHandler from '../../hooks/UseUnauthorizedHandler';
import { AuthenticationContext } from '../../../Context/AuthenticationContext';
import { Container, Typography, Box } from "@mui/material";

function ProgressPage(props) {
    const API_URL = "http://localhost:3000";
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
            <button onClick= {props.previous} > Previous </button>
            <h2> {months[props.month]} {props.year} </h2>
            <button onClick= {props.next} > Next </button>
            <Tooltip
                month={props.month}
                year={props.year}
                heatMap={heatMap}
                onViewDayDetails={viewDayDetails}
            />

            <HabitList
                habits={activeHabits}
                streaks={streaks}
                onViewDetails={viewHabitDetails}            
            />
            
        </Container>
    )
}

export default ProgressPage;